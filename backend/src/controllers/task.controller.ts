import { Request, Response } from "express";
import { TaskService } from "../service/task.service";

const taskService = new TaskService();

export class TaskController {
  async list(_req: Request, res: Response) {
    try {
      const tasks = await taskService.getTasks();

      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar as tarefas" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      const task = await taskService.createTask({ title, description });

      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar tarefa" });
    }
  }
}
