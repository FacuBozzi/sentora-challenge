import { useQuery } from "@tanstack/react-query";
import { fetchAPR } from "./api";

export function useAPR(pair: string, range: [Date, Date], window: number) {
  return useQuery({
    queryKey: ["apr", pair, range, window],
    queryFn: () =>
      fetchAPR(
        pair,
        range[0].toISOString(),
        range[1].toISOString(),
        window
      ),
    refetchInterval: 60_000, // auto refresh
  });
}
