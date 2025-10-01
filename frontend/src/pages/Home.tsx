import { useState } from "react";
import { Header } from "../components/Header";
import { FilterBar } from "../components/FilterBar";
import { TaskList } from "../components/TaskList";
import { TaskForm } from "../components/TaskForm";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../types/task";

export default function Home() {
  const {
    tasks,
    loading,
    error,
    sort,
    setSort,
    filter,
    setFilter,
    search,
    setSearch,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "pending") return t.status === "PENDING";
    if (filter === "in_progress") return t.status === "IN_PROGRESS";
    if (filter === "completed") return t.status === "DONE";
    return true;
  });

  const sortedTasks =
    sort === "alphabetical"
      ? [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title))
      : filteredTasks;

  const handleOpenNew = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleSubmitForm = async (
    title: string,
    description: string,
    status: Task["status"]
  ) => {
    if (editingTask) {
      await updateTask(editingTask.id, { title, description, status });
    } else {
      await createTask({ title, description, status });
    }
    handleCloseForm();
  };

  return (
    <>
      <Header
        title="Minhas Tarefas"
        subtitle="Organize suas atividades de forma eficiente"
        textButton="Nova Tarefa"
        onAddClick={handleOpenNew}
      />

      <main>
        <FilterBar
          textSearch="Buscar tarefas..."
          activeFilter={filter}
          onFilterChange={setFilter}
          activeSort={sort}
          onSortChange={setSort}
          search={search}
          onSearchChange={setSearch}
          tasks={tasks}
        />

        <TaskList
          tasks={sortedTasks}
          loading={loading}
          error={error}
          onEditTask={handleOpenEdit}
          onDeleteTask={deleteTask}
          onToggleStatus={async (task) => {
            const nextStatus =
              task.status === "PENDING"
                ? "IN_PROGRESS"
                : task.status === "IN_PROGRESS"
                ? "DONE"
                : "PENDING";

            await updateTask(task.id, { status: nextStatus });
          }}
        />
      </main>

      {isFormOpen && (
        <TaskForm
          task={editingTask}
          onCancel={handleCloseForm}
          onSubmit={handleSubmitForm}
        />
      )}
    </>
  );
}
