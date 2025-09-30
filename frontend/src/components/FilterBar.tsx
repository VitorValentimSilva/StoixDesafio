import { IoIosSearch } from "react-icons/io";

interface FilterBarProps {
  textSearch: string;
}

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
    </section>
  );
}
