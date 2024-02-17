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
const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        timestamp: {
          type: Date,
          default: Date.now
        },
      },
    ],
    report: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        reason: {
          type: String,
          required: true
        },
        timestamp: {
          type: Date,
          default: Date.now
        },
      },
    ],
    status: {
      type: String,
      required: true,
      default: "public"
    }
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
