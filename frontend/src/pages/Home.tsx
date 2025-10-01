import { FilterBar } from "../components/FilterBar";
import { Header } from "../components/Header";
import { TaskList } from "../components/TaskList";

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

        <TaskList filter="" sort="" />
      </main>
    </>
  );
}
