import { FilterBar } from "../components/FilterBar";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <>
      <Header
        title="Minhas Tarefas"
        subtitle="Organize suas atividades de forma eficiente"
        textButton="Nova Tarefa"
      />

      <main>
        <FilterBar textSearch="Buscar tarefas..." />
      </main>
    </>
  );
}
