import mongoose, { Schema } from "mongoose";

const LetterSchema = new Schema({
  recipient: { type: String, required: true, unique: true },
  password:{type: String, required: true},
  content: { type: String, required: true, unique: true },
  pics: {type:[String], default: 0 },
});

export default mongoose.model("Letters", LetterSchema);
