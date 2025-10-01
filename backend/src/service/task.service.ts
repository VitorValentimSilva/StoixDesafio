import { PrismaClient, Task } from "../generated/prisma";

const prisma = new PrismaClient();

export class TaskService {
  async getTasks(sort?: string, filter?: string): Promise<Task[]> {
    let orderBy = {};
    let where = {};

    switch (sort) {
      case "recent":
        orderBy = { createdAt: "desc" };
        break;
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      case "az":
        orderBy = { title: "asc" };
        break;
      default:
        orderBy = { id: "asc" };
        break;
    }

    switch (filter) {
      case "pending":
        where = { status: "PENDING" };
        break;
      case "in_progress":
        where = { status: "IN_PROGRESS" };
        break;
      case "done":
        where = { status: "DONE" };
        break;
      default:
        where = {};
        break;
    }

    return prisma.task.findMany({
      where,
      orderBy,
    });
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
