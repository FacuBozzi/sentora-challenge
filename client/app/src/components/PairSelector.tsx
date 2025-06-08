export type PairOption = {
  label: string;
  address: string;
};

const DEFAULT_PAIRS: PairOption[] = [
  { label: "USDC / WETH", address: "0xbc9d21652cca70f54351e3fb982c6b5dbe992a22" },
  { label: "USDC / ETH",  address: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc" },
];

type Props = {
  pairs?: PairOption[];
  value: string;
  onChange: (newAddress: string) => void;
};

export default function PairSelector({
  pairs = DEFAULT_PAIRS,
  value,
  onChange,
}: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Pair</label>
      <select
        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {pairs.map((p) => (
          <option key={p.address} value={p.address}>
            {p.label}
          </option>
        ))}
      </select>
    </div>
  );
}
