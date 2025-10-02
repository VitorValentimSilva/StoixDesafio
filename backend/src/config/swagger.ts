import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import taskSwagger from "../swagger/task.swagger";
import csrfSwagger from "../swagger/csrf.swagger";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.API_BASE_URL_PROD
    : "http://localhost:3000";

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Stoix - Desafio Prático",
    version: "1.0.0",
    description: "Desenvolvimento de um Sistema de Gerenciamento de Tarefas",
  },
  servers: [{ url: API_BASE_URL }],
  paths: {
    ...taskSwagger.paths,
    ...csrfSwagger.paths,
  },
  components: {
    schemas: {
      ...taskSwagger.components?.schemas,
      ...csrfSwagger.components?.schemas,
    },
    securitySchemes: {
      csrfAuth: {
        type: "apiKey",
        in: "header",
        name: "X-CSRF-Token",
        description: "Token CSRF necessário para requisições POST/PUT/DELETE",
      },
    },
  },
  security: [
    {
      csrfAuth: [],
    },
  ],
  tags: [...taskSwagger.tags, ...csrfSwagger.tags],
};

export const swaggerDocs = (app: Express, port: number) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger disponível em http://localhost:${port}/api-docs`);
};
