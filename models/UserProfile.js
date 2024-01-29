import mongoose from "mongoose";
/**
 * @des model for user profile
 * @author Nguyen
 * @date 30/01/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */

const UserProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fullname: {
      type: String,
      required: true,
    },
    avatar_url: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    connections: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: string,
          default: 0,
        },
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);
export default UserProfile;
