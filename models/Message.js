import mongoose, { Schema } from "mongoose";
import MessageList from "./MessageList.js";
/**
 * @des
 * @author Bui Anh Hong
 * @date 15/2/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */
const messageSchema = new Schema(
  {
    messageListId: {
      type: Schema.Types.ObjectId,
      ref: "MessageList",
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    sender: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
