import mongoose, { Schema } from "mongoose";
import User from "./User.js";
import Post from "./Post.js";
/**
 * @des add address
 * @author Bui Anh Hong
 * @date 2/3/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */
const connectionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);
const addressSchema = new Schema(
  {
    city: {
      type: String
    },
    country: {
      type:String
    }
  },
  {
    timestamps: true,
  }
);
const userProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 6)
          throw new Error(
            'Full name must be greater than or equal six characters!',
          );
      },
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
    connections: [connectionSchema],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    address: addressSchema
  },
  {
    timestamps: true,
  },
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
export default UserProfile;
