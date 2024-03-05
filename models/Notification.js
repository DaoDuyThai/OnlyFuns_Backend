import mongoose, { Schema } from "mongoose";
import User from "./User.js";
import Message from "./Message.js";
import MessageList from "./MessageList.js";
import Post from "./Post.js"
/**
 * @des
 * @author Bui Anh Hong
 * @date 15/2/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */
const notificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    messageListId: {
      type: Schema.Types.ObjectId,
      ref: "MessageList"
    },
    messageId: {
      type: Schema.Types.ObjectId,
      ref: "Message"
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  },
  {
    timestamps: true
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
