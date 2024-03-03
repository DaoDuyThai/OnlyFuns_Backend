import mongoose, { Schema } from "mongoose";
import crypto from "crypto";
import isEmail from "validator/lib/isEmail.js";
/**
 * @des
 * @author Trinh Minh Phuc
 * @date 29/1/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */
const generateVerificationCode = () => {
  return crypto.randomBytes(20).toString("hex");
};
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      validate(value){
        if(value.length < 6 || value.length > 30) throw new Error("Username must be form 6 to 30 charaters!");
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => isEmail,
        message: "Email is incorrect format!"
      }
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(value.length < 6) throw new Error("Password must be greater than or equal six!");
      }
    },
    role: {
      type: Number,
      default: 1
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    token:{
        type:String,
        default:undefined
    },
    verificationCode: {
      type: String,
      default: undefined
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
