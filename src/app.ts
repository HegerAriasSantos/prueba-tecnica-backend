import express from "express";
import holidayRoutes from "./presentation/routes/holiday.routes";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { swaggerDocs, swaggerUi } from "./doc/swagger";
import { ENV } from "./shared/config/env";

const app = express();

app.use(helmet());
app.use(
	cors({
		origin: ENV.CORS_ORIGIN,
	}),
);
const limiter = rateLimit({
	windowMs: ENV.RATE_LIMIT_WINDOW,
	max: ENV.RATE_LIMIT_MAX,
});
app.use(limiter);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", holidayRoutes);
const PORT = ENV.PORT;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
