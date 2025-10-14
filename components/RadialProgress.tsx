type Props = {
  value: number; // 0-100
  label: string;
  size?: number; // px
  color?: string; // stroke color
};

export default function RadialProgress({ value, label, size = 96, color = "#22c55e" }: Props) {
  const radius = (size - 12) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(1, Math.max(0, value / 100)));

  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size}>
        <circle cx={cx} cy={cy} r={radius} stroke="#334155" strokeWidth={8} fill="none" />
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={color}
          strokeWidth={8}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="fill-white text-sm font-semibold">
          {Math.round(value)}%
        </text>
      </svg>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-medium">Progression</p>
      </div>
    </div>
  );
}


