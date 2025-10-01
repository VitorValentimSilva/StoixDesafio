interface ButtonSortProps {
  label: string;
  value: string;
  isActive: boolean;
  onSortChange: (value: string) => void;
}

export function ButtonSort({
  label,
  value,
  isActive,
  onSortChange,
}: ButtonSortProps) {
  return (
    <button
      onClick={() => onSortChange(value)}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                  ${
                    isActive
                      ? "bg-slate-800 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-100 border-2 border-slate-200"
                  }`}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
}
