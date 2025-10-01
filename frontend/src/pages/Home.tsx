import { useState } from "react";
import { FilterBar } from "../components/FilterBar";
import { Header } from "../components/Header";
import { TaskList } from "../components/TaskList";
import type { FilterType, SortType } from "../types/task";

export default function Home() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("newest");

  const mapFilterToBackend = (f: FilterType) => {
    if (f === "all") return "";
    if (f === "completed") return "done";
    return f;
  };

  const mapSortToBackend = (s: SortType) => {
    if (s === "newest") return "recent";
    if (s === "alphabetical") return "az";
    return s;
  };

  return (
    <>
      <Header
        title="Minhas Tarefas"
        subtitle="Organize suas atividades de forma eficiente"
        textButton="Nova Tarefa"
      />

      <main>
        <FilterBar
          textSearch="Buscar tarefas..."
          activeFilter={filter}
          onFilterChange={(v) => setFilter(v)}
          activeSort={sort}
          onSortChange={(s) => setSort(s)}
        />

        <TaskList
          filter={mapFilterToBackend(filter)}
          sort={mapSortToBackend(sort)}
        />
      </main>
    </>
  );
}
