const taskSwagger = {
  paths: {
    "/task": {
      get: {
        summary: "Retorna todas as tarefas cadastradas",
        description: "Retorna uma lista completa com os dados das tarefas.",
        tags: ["Tarefa"],
        responses: {
          "200": {
            description: "Lista de tarefas",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Task" },
                },
              },
            },
          },
          "404": {
            description: "Nenhuma tarefa encontrada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Nenhuma tarefa cadastrada",
                    },
                  },
                  required: ["message"],
                },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Erro interno do servidor",
                    },
                  },
                  required: ["message"],
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Task: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          title: { type: "string", example: "Comprar mantimentos" },
          description: {
            type: "string",
            nullable: true,
            example: "Leite, pão e ovos",
          },
          status: {
            type: "string",
            enum: ["PENDING", "IN_PROGRESS", "DONE"],
            example: "PENDING",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2025-09-30T17:00:00Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2025-09-30T17:05:00Z",
          },
        },
        required: ["id", "title", "status", "createdAt", "updatedAt"],
      },
    },
  },
  tags: [
    {
      name: "Tarefa",
      description: "Operações relacionadas a tarefas",
    },
  ],
};

export default taskSwagger;
