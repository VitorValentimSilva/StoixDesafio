import { TaskCard } from "./TaskCard";
import type { Task } from "../types/task";
import { Loading } from "./Loading";
import { NoTasks } from "./NoTasks";
import { AllCompletedTask } from "./AllCompletedTask";

interface TaskListProps {
  tasks: Task[];
  loading?: boolean;
  error?: string | null;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (id: number) => void;
}

export function TaskList({
  tasks,
  loading,
  error,
  onEditTask,
  onDeleteTask,
}: TaskListProps) {
  if (loading)
    return (
      <div className="w-5/6 m-auto my-6">
        <Loading />
      </div>
    );

  if (error)
    return (
      <p className="text-2xl font-bold text-center mt-6 text-red-500">
        {error}
      </p>
    );

  if (!tasks.length)
    return (
      <NoTasks
        title="Nenhuma tarefa encontrada"
        message="Comece criando uma nova tarefa para organizar suas atividades!"
      />
    );

  if (tasks.every((t) => t.status === "DONE")) {
    return (
      <div className="w-5/6 m-auto mt-6">
        <AllCompletedTask
          title="Parabéns!"
          message="Todas as suas tarefas foram concluídas!"
        />
      </div>
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
            <TaskCard task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
          </div>
        ))}
      </div>
    </section>
  );
}
