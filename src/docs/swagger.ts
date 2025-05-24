import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
    openapi: "3.0.4",
    info: {
        title: "API Coordinadora",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:8001/api",
            description: "Servidor local",
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description: "JWT token",
            },
        },
        schemas: {
            User: {
                type: "object",
                required: ["name", "email", "state"],
                properties: {
                    name: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                    state: {
                        type: "number",
                    },
                },
            }
        },
    },
}

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"],
}

export default swaggerJSDoc(swaggerOptions);