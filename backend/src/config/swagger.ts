import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import taskSwagger from "../swagger/task.swagger";

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Stoix - Desafio Prático",
    version: "1.0.0",
    description: "Desenvolvimento de um Sistema de Gerenciamento de Tarefas",
  },
  servers: [{ url: "http://localhost:3000" }],
  paths: { ...taskSwagger.paths },
  components: { ...taskSwagger.components },
  tags: [...taskSwagger.tags],
};

export const swaggerDocs = (app: Express, port: number) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger disponível em http://localhost:${port}/api-docs`);
};
