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
const userProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 6,
        message: 'Fullname must be at least 6 charaters!'
    }
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
          default: "pending"
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
