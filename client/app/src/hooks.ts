import { useQuery } from "@tanstack/react-query";
import { fetchAPR } from "./api";
import { formatTimestampUTC } from "./lib/formatTimestamp";

export function useAPR(pair: string, range: [Date, Date], window: number) {
  return useQuery({
    queryKey: ["apr", pair, range, window],
    queryFn: async () => {
      const data = await fetchAPR(
        pair,
        range[0].toISOString(),
        range[1].toISOString(),
        window
      );
      // Format timestamps using your custom function
      return data.map(item => ({
        ...item,
        ts: formatTimestampUTC(item.ts)
      }));
    },
    refetchInterval: 60_000, // auto refresh
  });
}
