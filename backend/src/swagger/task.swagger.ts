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
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
      post: {
        summary: "Cria uma nova tarefa",
        description: "Cria uma tarefa com título e descrição opcional.",
        tags: ["Tarefa"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TaskCreate" },
              examples: {
                exemplo1: {
                  summary: "Exemplo de criação de tarefa",
                  value: {
                    title: "Comprar mantimentos",
                    description: "Leite, pão e ovos",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Tarefa criada com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Task" },
              },
            },
          },
          "400": {
            description: "Dados inválidos",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
        security: [{ csrfAuth: [] }],
      },
    },
    "/task/{id}": {
      put: {
        summary: "Atualiza uma tarefa existente",
        description:
          "Atualiza título, descrição ou status de uma tarefa pelo ID.",
        tags: ["Tarefa"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID da tarefa a ser atualizada",
            required: true,
            schema: { type: "integer", example: 1 },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "Comprar mantimentos" },
                  description: {
                    type: "string",
                    nullable: true,
                    example: "Leite, pão e ovos",
                  },
                  status: {
                    type: "string",
                    enum: ["PENDING", "IN_PROGRESS", "DONE"],
                    example: "IN_PROGRESS",
                  },
                },
              },
              examples: {
                exemplo1: {
                  summary: "Exemplo de atualização",
                  value: {
                    title: "Comprar mantimentos",
                    description: "Leite, pão e ovos",
                    status: "IN_PROGRESS",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Tarefa atualizada com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Task" },
              },
            },
          },
          "400": {
            description: "Dados inválidos",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "404": {
            description: "Tarefa não encontrada",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
        security: [{ csrfAuth: [] }],
      },
      delete: {
        summary: "Exclui uma tarefa existente",
        description: "Exclui uma tarefa pelo ID fornecido.",
        tags: ["Tarefa"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID da tarefa a ser excluída",
            required: true,
            schema: { type: "integer", example: 1 },
          },
        ],
        responses: {
          "200": {
            description: "Tarefa excluída com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Tarefa excluída com sucesso",
                    },
                  },
                  required: ["message"],
                },
              },
            },
          },
          "404": {
            description: "Tarefa não encontrada",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
        security: [{ csrfAuth: [] }],
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
      TaskCreate: {
        type: "object",
        properties: {
          title: { type: "string", example: "Comprar mantimentos" },
          description: {
            type: "string",
            nullable: true,
            example: "Leite, pão e ovos",
          },
        },
        required: ["title"],
      },
      ErrorResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Erro ao processar a requisição",
          },
        },
        required: ["message"],
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
