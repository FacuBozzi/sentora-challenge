const OPTIONS = [
  { label: "1 hour MA",  value: 1  as const },
  { label: "12 hour MA", value: 12 as const },
  { label: "24 hour MA", value: 24 as const },
];

type Window = 1 | 12 | 24;

type Props = {
  value: Window;
  onChange: (w: Window) => void;
};

export default function PeriodSelector({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Period</label>
      <select
        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) as Window)}
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
