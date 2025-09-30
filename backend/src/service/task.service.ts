import { PrismaClient, Task } from "../generated/prisma";

const prisma = new PrismaClient();

export class TaskService {
  async getTasks(): Promise<Task[]> {
    return prisma.task.findMany();
  }

  async createTask(data: {
    title: string;
    description?: string;
  }): Promise<Task> {
    return prisma.task.create({ data });
  }
}
