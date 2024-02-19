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
const likeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
  }
);
const repostSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    reason: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);
const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    likes: [likeSchema],
    report: [repostSchema],
    status: {
      type: String,
      default: "public",
    },
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
