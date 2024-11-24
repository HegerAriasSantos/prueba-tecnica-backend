import { ENV } from "../shared/config/env";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "My API",
			version: "1.0.0",
			description: "API documentation for my Express application",
		},
		servers: [
			{
				url: `http://localhost:${ENV.PORT}/api`,
			},
		],
	},
	apis: ["./src/**/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };
