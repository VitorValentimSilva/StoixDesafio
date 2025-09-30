import { PrismaClient, Task } from "../generated/prisma";

const prisma = new PrismaClient();

export class TaskService {
  async getTasks(): Promise<Task[]> {
    return prisma.task.findMany();
  }
}
