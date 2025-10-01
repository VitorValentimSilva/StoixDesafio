import { IoIosSearch } from "react-icons/io";
import { ButtonStatus } from "./ButtonStatus";
import { CiClock2 } from "react-icons/ci";
import { GoCheckCircle, GoCircle } from "react-icons/go";
import { LuFilter } from "react-icons/lu";
import { VscListOrdered } from "react-icons/vsc";
import { ButtonSort } from "./ButtonSort";
import type { FilterType, SortType, Task } from "../types/task";

interface FilterBarProps {
  textSearch: string;
  activeFilter: FilterType;
  onFilterChange: (value: FilterType) => void;
  activeSort: SortType;
  onSortChange: (value: SortType) => void;
  search: string;
  onSearchChange: (value: string) => void;
  tasks: Task[];
}

const filterButtons = [
  { value: "all" as FilterType, label: "Todas", icon: LuFilter },
  { value: "pending" as FilterType, label: "Pendentes", icon: GoCircle },
  { value: "in_progress" as FilterType, label: "Em Progresso", icon: CiClock2 },
  {
    value: "completed" as FilterType,
    label: "Concluídas",
    icon: GoCheckCircle,
  },
];

const sortOptions = [
  { value: "recent" as SortType, label: "Mais Recentes" },
  { value: "oldest" as SortType, label: "Mais Antigas" },
  { value: "alphabetical" as SortType, label: "A-Z" },
];

export function FilterBar({
  textSearch,
  activeFilter,
  onFilterChange,
  activeSort,
  onSortChange,
  search,
  onSearchChange,
  tasks,
}: FilterBarProps) {
  const counts = tasks.reduce(
    (acc, t) => {
      acc.all++;
      if (t.status === "PENDING") acc.pending++;
      else if (t.status === "IN_PROGRESS") acc.in_progress++;
      else if (t.status === "DONE") acc.completed++;
      return acc;
    },
    { all: 0, pending: 0, in_progress: 0, completed: 0 }
  );

  return (
    <section className="w-5/6 mx-auto mt-6">
      <div className="relative">
        <IoIosSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

        <input
          type="text"
          placeholder={textSearch}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-200 bg-white focus:border-blue-500 
          outline-none transition-all duration-200 text-slate-700 placeholder:text-slate-400"
        />
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        {filterButtons.map((f) => (
          <ButtonStatus
            key={f.value}
            value={f.value}
            icon={f.icon}
            label={f.label}
            isActive={f.value === activeFilter}
            count={
              f.value === "all"
                ? counts.all
                : f.value === "pending"
                ? counts.pending
                : f.value === "in_progress"
                ? counts.in_progress
                : counts.completed
            }
            onFilterChange={(v) => onFilterChange(v as FilterType)}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-6">
        <div className="flex items-center gap-2 text-slate-600">
          <VscListOrdered className="w-6 h-6" />

          <span className="font-semibold">Ordenar:</span>
        </div>

        <div className="flex gap-2 overflow-x-auto sm:overflow-x-visible">
          {sortOptions.map((s) => (
            <ButtonSort
              key={s.value}
              value={s.value}
              label={s.label}
              isActive={s.value === activeSort}
              onSortChange={(v) => onSortChange(v as SortType)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
