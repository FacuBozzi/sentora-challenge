import { useState } from "react";
import dayjs from "dayjs";
import PairSelector from "./PairSelector";
import PeriodSelector from "./PeriodSelector";
import AprChart from "./AprChart";

export default function Dashboard() {
  const [pair, setPair] = useState(
    "0xbc9d21652cca70f54351e3fb982c6b5dbe992a22"
  );
  const [window, setWindow] = useState<1 | 12 | 24>(1);
  const [range] = useState<[Date, Date]>([
    dayjs().subtract(7, "day").toDate(),
    new Date(),
  ]);

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <PairSelector value={pair} onChange={setPair} />
        <PeriodSelector value={window} onChange={setWindow} />
      </div>
      <AprChart pair={pair} window={window} range={range} />
    </div>
  );
}
