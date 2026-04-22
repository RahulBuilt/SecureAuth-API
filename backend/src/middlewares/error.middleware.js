const env = require("../config/env");

const errorMiddleware = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message,
    ...(env.nodeEnv !== "production" ? { stack: err.stack } : {}),
  });
};

module.exports = errorMiddleware;
