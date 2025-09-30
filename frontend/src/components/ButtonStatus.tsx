interface ButtonStatusProps {
  value: string;
  icon: React.ComponentType;
  label: string;
  isActive: boolean;
  count: number;
  onFilterChange: (value: string) => void;
}

export function ButtonStatus({
  value,
  icon,
  label,
  isActive,
  count,
  onFilterChange,
}: ButtonStatusProps) {
  const Icon = icon;

  return (
    <button
      onClick={() => onFilterChange(value)}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105"
                    : "bg-white text-slate-600 hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300"
                }`}
    >
      <Icon />

      <span>{label}</span>

      <span
        className={`px-2 py-0.5 rounded-full text-xs font-semibold
                  ${
                    isActive
                      ? "bg-white/25 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
      >
        {count}
      </span>
    </button>
  );
}
