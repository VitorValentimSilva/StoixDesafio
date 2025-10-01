import type { CreateTaskInput, Task, UpdateTaskInput } from "../types/task";
import tokenService from "./tokenService";

export const taskService = {
  getTasks: async (sort?: string, filter?: string): Promise<Task[]> => {
    const params: Record<string, string> = {};
    
    if (sort) params.sort = sort;
    if (filter) params.filter = filter;

    const { data } = await tokenService.get<Task[]>("/task", { params });
    return data;
  },

  createTask: async (payload: CreateTaskInput): Promise<Task> => {
    const { data } = await tokenService.post<Task>("/task", payload);
    return data;
  },

  updateTask: async (
    id: string | number,
    payload: UpdateTaskInput
  ): Promise<Task> => {
    const { data } = await tokenService.put<Task>(`/task/${id}`, payload);
    return data;
  },

  deleteTask: async (id: string | number): Promise<Task> => {
    const { data } = await tokenService.delete<Task>(`/task/${id}`);
    return data;
  },
};
