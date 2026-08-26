import app from "./app.js";
import { env } from "./config/env.js";
import { testConnection } from "./config/postgres.js";

const PORT = env.PORT;

const start = () => {
  app.listen(PORT, async () => {
    try {
      await testConnection();
      console.log("Connected to database");
      console.log(`Server running on port: ${PORT}`);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });
};

start();
