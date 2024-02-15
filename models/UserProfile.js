import mongoose, { Schema } from "mongoose";
import User from "./User.js";
import Post from "./Post.js";
/**
 * @des
 * @author
 * @date
 * @param {*} req
 * @param {*} res
 * @returns
 */
const userProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      minlength: 6,
      required: true,
    },
    profilePictureUrl: {
      type: String,
    },
    backgroundPictureUrl: {
      type: String,
    },
    bio: {
      type: String,
    },
    connections: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        status: {
          type: String,
        },
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
export default UserProfile;
