import { Router } from "express";
import pg from "pg";
import { calcAPR } from "./apr";
const router = Router();
const pool = new pg.Pool({ connectionString: process.env.PG_CONN });

// GET /api/apr?pair=0x..&from=2024-06-01&to=2024-06-08&window=12
router.get("/apr", async (req, res) => {
  const { pair, from, to, window = "1" } = req.query as Record<
    string,
    string
  >;
  const w = Number(window) as 1 | 12 | 24;
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `
      with b as (
        select
          ts,
          liquidity,
          fees,
          sum(fees) over (order by ts rows between $3-1 preceding and current row) as fee_sum,
          avg(liquidity) over (order by ts rows between $3-1 preceding and current row) as liq_avg
        from pair_snapshots
        where pair_address=$1 and ts between $2 and $4
        order by ts
      )
      select ts, fee_sum, liq_avg
      from b where fee_sum is not null
    `,
      [pair, from, w, to]
    );
    const series = rows.map((r) => ({
      ts: r.ts,
      apr: calcAPR(Number(r.fee_sum), Number(r.liq_avg), w),
    }));
    res.json(series);
  } finally {
    client.release();
  }
});

export default router;
