import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const taskRouter = Router();
const taskController = new TaskController();

taskRouter.get("/", (req, res) => taskController.list(req, res));

export default taskRouter;
