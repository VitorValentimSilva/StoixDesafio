import express = require("express");
import taskRoutes from "./task.routes";

const router = express.Router();

router.use("/task", taskRoutes);

export default router;
