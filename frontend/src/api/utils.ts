import { config } from "dotenv";

config();
export const BACKEND_URL =
  import.meta.env.BACKEND_URL || `http://localhost:5173`;

