import { useCallback, useEffect, useState } from "react";
import { taskService } from "../api/taskService";
import {
  type CreateTaskInput,
  type FilterType,
  type SortType,
  type Task,
  type UpdateTaskInput,
} from "../types/task";

export function useTasks(
  initialSort: SortType = "recent",
  initialFilter: FilterType = "all"
) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<SortType>(initialSort);
  const [filter, setFilter] = useState<FilterType>(initialFilter);
  const [search, setSearch] = useState<string>(""); // ✅ novo

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks(sort, filter, search);
      setTasks(data);
    } catch (err: unknown) {
      setError((err as Error)?.message ?? "Erro ao buscar tarefas");
    } finally {
      setLoading(false);
    }
  }, [sort, filter, search]); // ✅ dependências

  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

  const createTask = async (input: CreateTaskInput) => {
    setLoading(true);
    try {
      await taskService.createTask(input);
      await fetchTasks();
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: number, input: UpdateTaskInput) => {
    setLoading(true);
    try {
      await taskService.updateTask(id, input);
      await fetchTasks();
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    setLoading(true);
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    sort,
    setSort,
    filter,
    setFilter,
    search,
    setSearch,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  } as const;
}
