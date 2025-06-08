import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
  } from "recharts";
  import { useAPR } from "../hooks";
  
  export default function AprChart({
    pair,
    range,
    window,
  }: {
    pair: string;
    range: [Date, Date];
    window: number;
  }) {
    const { data, isLoading } = useAPR(pair, range, window);
    if (isLoading) return <p>Loading chart…</p>;
  
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="ts" />
          <YAxis domain={[0, "dataMax"]} tickFormatter={(v) => v + "%"} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="apr"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  