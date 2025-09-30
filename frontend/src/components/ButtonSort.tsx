interface ButtonSortProps {
  label: string;
  isActive: boolean;
}

export function ButtonSort({ label, isActive }: ButtonSortProps) {
  return (
    <button
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                  ${
                    isActive
                      ? "bg-slate-800 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-100 border-2 border-slate-200"
                  }`}
    >
      {label}
    </button>
  );
}
