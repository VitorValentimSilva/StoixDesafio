import axios from "axios";
import type { CreateTaskInput, Task, UpdateTaskInput } from "../types/task";

const API_URL = "http://localhost:3000";

export const taskService = {
  getTasks: async (sort?: string, filter?: string): Promise<Task[]> => {
    const params: Record<string, string> = {};

    if (sort) params.sort = sort;
    if (filter) params.filter = filter;

    const { data } = await axios.get<Task[]>(`${API_URL}/task`, { params });
    return data;
  },

  createTask: async (payload: CreateTaskInput): Promise<Task> => {
    const { data } = await axios.post<Task>(`${API_URL}/task`, payload);
    return data;
  },

  updateTask: async (
    id: string | number,
    payload: UpdateTaskInput
  ): Promise<Task> => {
    const { data } = await axios.put<Task>(`${API_URL}/task/${id}`, payload);
    return data;
  },

  deleteTask: async (id: string | number): Promise<Task> => {
    const { data } = await axios.delete<Task>(`${API_URL}/task/${id}`);
    return data;
  },
};
