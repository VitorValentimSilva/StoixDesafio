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

  async updateTask(id: number, data: Partial<Task>): Promise<Task> {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteTask(id: number): Promise<Task> {
    return prisma.task.delete({
      where: { id },
    });
  }
}
