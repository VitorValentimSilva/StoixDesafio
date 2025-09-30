const csrfSwagger = {
  paths: {
    "/csrf-token": {
      get: {
        tags: ["CSRF"],
        summary: "Obter CSRF Token",
        description:
          "Recupera um CSRF token para proteger requisições POST, PUT ou DELETE.",
        responses: {
          "200": {
            description: "CSRF token recuperado com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CsrfToken",
                },
                examples: {
                  exemplo1: {
                    summary: "Exemplo de token CSRF",
                    value: {
                      csrfToken: "abc123xyz456",
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
                examples: {
                  exemploErro: {
                    summary: "Erro interno",
                    value: { message: "Erro interno do servidor" },
                  },
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
      CsrfToken: {
        type: "object",
        properties: {
          csrfToken: { type: "string", example: "abc123xyz456" },
        },
        required: ["csrfToken"],
      },
      ErrorResponse: {
        type: "object",
        properties: {
          message: { type: "string", example: "Erro interno do servidor" },
        },
        required: ["message"],
      },
    },
  },
  tags: [
    {
      name: "CSRF",
      description: "Operações relacionadas à proteção CSRF",
    },
  ],
};

export default csrfSwagger;
