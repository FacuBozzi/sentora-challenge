import { request, gql } from "graphql-request";
import pg from "pg";
import dotenv from "dotenv";
import format from "pg-format";
dotenv.config();

const { PG_CONN, GRAPH_URL, PAIR_ADDRESSES } = process.env;
const pool = new pg.Pool({ connectionString: PG_CONN });

const HOUR = 60 * 60 * 1000;
const pairs = PAIR_ADDRESSES!.split(",");

const PAIR_QUERY = gql`
  query ($id: ID!) {
    pair(id: $id) {
      reserveUSD
    }
  }
`;

// fetch snapshots: past 48 h on first run, else only new ones
export async function run() {
  const client = await pool.connect();
  try {
    for (const address of pairs) {
      const { rows } = await client.query(
        "select max(ts) ts from pair_snapshots where pair_address=$1",
        [address]
      );
      const since =
        rows[0].ts ?? new Date(Date.now() - 48 * HOUR).toISOString(); // first time
      // Graph query – pairHourDatas ordered by hourStartUnix asc
      const query = gql`
        query ($pair: String!, $since: Int!) {
          pairHourDatas(
            first: 1000
            orderBy: hourStartUnix
            orderDirection: asc
            where: { pair: $pair, hourStartUnix_gt: $since }
          ) {
            hourStartUnix
            reserveUSD
            hourlyVolumeUSD
          }
        }
      `;
      const data: any = await request(GRAPH_URL!, query, {
        pair: address.toLowerCase(),
        since: Math.floor(new Date(since).getTime() / 1000),
      });
      let hours = data.pairHourDatas as Array<{
        hourStartUnix: number;
        reserveUSD: string;
        hourlyVolumeUSD: string;
      }>;

      // if no recent hourly snapshots, grab the current reserve
      if (hours.length === 0) {
        console.warn(
          `No hourly data for ${address} since ${since}, inserting reserve-only row.`
        );
        const fb: any = await request(GRAPH_URL!, PAIR_QUERY, {
          id: address.toLowerCase(),
        });
        if (fb.pair) {
          const nowIso = new Date().toISOString();
          const liq = Number(fb.pair.reserveUSD);
          hours = [
            {
              hourStartUnix: Date.now() / 1000,
              reserveUSD: fb.pair.reserveUSD,
              hourlyVolumeUSD: "0",
            },
          ];
        }
      }

      const values = hours.map((d) => {
        const liquidity = Number(d.reserveUSD);
        const volumeUSD = Number(d.hourlyVolumeUSD);
        const feesUSD = volumeUSD * 0.003; // 0.3% fee
        return [
          address,
          new Date(d.hourStartUnix * 1000).toISOString(),
          liquidity,
          volumeUSD,
          feesUSD,
        ];
      });

      if (values.length) {
        const sql = format(
          "INSERT INTO pair_snapshots (pair_address, ts, liquidity, volume, fees) VALUES %L ON CONFLICT DO NOTHING",
          values
        );
        await client.query(sql);
      }
    }
    console.log("Ingest ok", new Date().toISOString());
  } finally {
    client.release();
  }
}

// run once now
run();

// schedule every 5 min to guarantee ≤ 60 min latency
import cron from "node-cron";
cron.schedule("*/5 * * * *", run);
