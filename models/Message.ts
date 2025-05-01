import mongoose, { Document, Model } from "mongoose";

export interface IMessage extends Document {
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
}

const MessageSchema = new mongoose.Schema<IMessage>(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: [true, "Please provide your message"],
    },
  },
  {
    timestamps: true,
  }
);

// * Prevent model overwrite upon hot reloading in development
const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
