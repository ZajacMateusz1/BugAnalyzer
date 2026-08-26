import { env } from "./env.js";
import { Pool } from "pg";

const pool = new Pool({
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  database: env.POSTGRES_DATABASE,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
});

export const testConnection = async () => {
  return await pool.query("SELECT 1");
};

export default pool;
