import mongoose from "mongoose";
/**
 * @des model for user
 * @author Nguyen
 * @date 30/01/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    token: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    user_profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
