import { config } from "dotenv";

config();

export const ENV = process.env.NODE_ENV || "production"; 
export const SUPABASE_URL = process.env.SUPABASE_URL; 
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
export const PORT = Number(process.env.PORT || 3002);
export const DB_URI = process.env.DB_URI;
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
export const BACKEND_URL =
  process.env.BACKEND_URL || `http://localhost:${PORT}`;

if (!DB_URI) {
  console.log("Missing DB_URI environment variable");
  process.exit(1);
}

