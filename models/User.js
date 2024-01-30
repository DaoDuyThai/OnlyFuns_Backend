import mongoose from "mongoose";
import crypto from 'crypto'
/** 
 * @des 
 * @author Trinh Minh Phuc
 * @date 29/1/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */
const generateVerificationCode = () => {
    return crypto.randomBytes(20).toString('hex');
  };
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 30,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
    },
    role: {
        type: Number,
        default: 1
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        default: undefined
    },
},
    { timestamps: true })
const User = mongoose.model('User', UserSchema);
export default User;