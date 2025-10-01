import { useTasks } from "../hooks/useTasks";
import { Loading } from "./Loading";
import { NoTasks } from "./NoTasks";
import { TaskCard } from "./TaskCard";

interface TaskListProps {
  sort: string;
  filter: string;
}

export function TaskList({ sort, filter }: TaskListProps) {
  const { tasks, loading, error } = useTasks(sort, filter);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <p className="text-2xl font-bold text-center mt-6 text-red-500">
        {error}
      </p>
    );
  }

  if (tasks.length === 0) {
    return (
      <NoTasks
        title="Nenhuma tarefa encontrada"
        message="Comece criando uma nova tarefa para organizar suas atividades!"
      />
    );
  }

  return (
    <section className="w-5/6 mx-auto mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="animate-slide-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <TaskCard task={task} />
          </div>
        ))}
      </div>
    </section>
  );
}
