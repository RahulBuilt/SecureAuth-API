const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");

const env = require("./config/env");
const swaggerSpec = require("./docs/swagger");
const authRoutes = require("./modules/auth/auth.routes");
const taskRoutes = require("./modules/tasks/task.routes");
const sanitizeMiddleware = require("./middlewares/sanitize.middleware");
const adminRoutes = require("./modules/tasks/admin.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.corsOrigin,
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(sanitizeMiddleware);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Service is healthy" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/auth", authLimiter, authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use((_req, _res, next) => {
  const err = new Error("Route not found");
  err.statusCode = 404;
  next(err);
});

app.use(errorMiddleware);

module.exports = app;
