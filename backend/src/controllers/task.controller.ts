import { Request, Response } from "express";
import { TaskService } from "../service/task.service";

const taskService = new TaskService();

export class TaskController {
  async list(req: Request, res: Response) {
    try {
      const { sort, filter } = req.query;
      const tasks = await taskService.getTasks(
        sort as string,
        filter as string
      );

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

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;

      const task = await taskService.updateTask(Number(id), {
        title,
        description,
        status,
      });

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar tarefa" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const task = await taskService.deleteTask(Number(id));

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir tarefa" });
    }
  }
}
