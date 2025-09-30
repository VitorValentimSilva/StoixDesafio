import express = require("express");
import taskRoutes from "./task.routes";
import csrfRouter from "./csrf.routes";

const router = express.Router();

router.use("/task", taskRoutes);
router.use("/csrf-token", csrfRouter);

export default router;
