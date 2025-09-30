import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const taskRouter = Router();
const taskController = new TaskController();

taskRouter.get("/", (req, res) => taskController.list(req, res));
taskRouter.post("/", (req, res) => taskController.create(req, res));
taskRouter.put("/:id", (req, res) => taskController.update(req, res));
taskRouter.delete("/:id", (req, res) => taskController.delete(req, res));

export default taskRouter;
