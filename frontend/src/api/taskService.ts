import axios from "axios";
import type { Task } from "../types/task";

const API_URL = "http://localhost:3000";

export const taskService = {
  getTasks: async (sort?: string, filter?: string): Promise<Task[]> => {
    const params: Record<string, string> = {};

    if (sort) params.sort = sort;
    if (filter) params.filter = filter;

    const { data } = await axios.get<Task[]>(`${API_URL}/task`, { params });
    return data;
  },
};
