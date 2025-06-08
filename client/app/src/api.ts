import axios from "axios";
const baseURL = import.meta.env.VITE_API ?? "http://localhost:4000";
export async function fetchAPR(
  pair: string,
  from: string,
  to: string,
  window: number
) {
  const res = await axios.get(`${baseURL}/api/apr`, {
    params: { pair, from, to, window },
  });
  return res.data as { ts: string; apr: number }[];
}
