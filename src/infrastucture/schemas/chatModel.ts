import { Schema, model, Document } from "mongoose";

interface IMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface IChat extends Document {
  userId: string;
  messages: IMessage[];
  createdAt: Date;
}

const ChatSchema = new Schema<IChat>({
  userId: { type: String, required: true },
  messages: [{
    role: { type: String, enum: ["user", "assistant", "system"], required: true },
    content: { type: String, required: true }
  }],
  createdAt: { type: Date, default: Date.now }
});

export const Chat = model<IChat>("Chat", ChatSchema);