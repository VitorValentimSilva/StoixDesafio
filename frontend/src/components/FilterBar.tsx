import { IoIosSearch } from "react-icons/io";
import { ButtonStatus } from "./ButtonStatus";
import { CiClock2 } from "react-icons/ci";
import { GoCheckCircle, GoCircle } from "react-icons/go";
import { LuFilter } from "react-icons/lu";
import { VscListOrdered } from "react-icons/vsc";
import { ButtonSort } from "./ButtonSort";

export type FilterType = "all" | "pending" | "in_progress" | "completed";
export type SortType = "newest" | "oldest" | "alphabetical";

interface FilterBarProps {
  textSearch: string;
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
  { value: "newest" as SortType, label: "Mais Recentes" },
  { value: "oldest" as SortType, label: "Mais Antigas" },
  { value: "alphabetical" as SortType, label: "A-Z" },
];

export function FilterBar({ textSearch }: FilterBarProps) {
  return (
    <section className="w-5/6 mx-auto mt-6">
      <div className="relative">
        <IoIosSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder={textSearch}
          className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-200 bg-white focus:border-blue-500 
          outline-none transition-all duration-200 text-slate-700 placeholder:text-slate-400"
        />
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        {filterButtons.map((filter) => (
          <ButtonStatus
            key={filter.value}
            value={filter.value}
            icon={filter.icon}
            label={filter.label}
            isActive={filter.value === "all"}
            count={5}
            onFilterChange={() => {}}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-6">
        <div className="flex items-center gap-2 text-slate-600">
          <VscListOrdered className="w-6 h-6" />

          <span className="font-semibold">Ordenar:</span>
        </div>

        <div className="flex gap-2 overflow-x-auto sm:overflow-x-visible">
          {sortOptions.map((sort) => (
            <ButtonSort key={sort.value} label={sort.label} isActive={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
