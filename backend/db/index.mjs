import mongoose from "mongoose";
import { DB_URI } from "../utils/env.mjs";
import letter from "./models/letter.mjs";

export async function connectDB() {
  const state = mongoose.connection.readyState;
  if (state === 1 || state === 2) {
    console.log("Already connected");
    return;
  }

  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");

    await letter.syncIndexes();
    console.log("Indexes synced");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
