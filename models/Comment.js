import mongoose, { Schema } from "mongoose";
import User from "./User.js";
import Post from "./Post.js";
/**
 * @des
 * @author Bui Anh Hong
 * @date 15/2/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */
const commentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
