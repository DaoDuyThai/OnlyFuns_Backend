import mongoose, { Schema } from "mongoose";
import User from "./User.js";
/**
 * @des
 * @author Bui Anh Hong
 * @date 15/2/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */
const messageListSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: [
      {
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const MessageList = mongoose.model("MessageList", messageListSchema);
export default MessageList;
