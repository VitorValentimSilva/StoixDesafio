import { Router } from "express";

const csrfRouter = Router();

csrfRouter.get("/", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

export default csrfRouter;
