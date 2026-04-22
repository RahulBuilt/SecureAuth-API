const app = require("./app");
const env = require("./config/env");
const connectDB = require("./config/db");

const bootstrap = async () => {
  try {
    if (!env.jwtSecret) {
      throw new Error("JWT_SECRET is not configured");
    }
    await connectDB();
    app.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

bootstrap();
