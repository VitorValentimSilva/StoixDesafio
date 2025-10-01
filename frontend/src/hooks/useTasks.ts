import { useEffect, useState } from "react";
import { taskService } from "../api/taskService";
import type { Task } from "../types/task";

export function useTasks(sort: string, filter: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    taskService
      .getTasks(sort, filter)
      .then(setTasks)
      .catch(() => setError("Erro ao carregar tarefas"))
      .finally(() => setLoading(false));
  }, [sort, filter]);

  return { tasks, loading, error };
}
