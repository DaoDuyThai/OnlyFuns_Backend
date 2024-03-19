import mongoose, { Schema } from 'mongoose';
import User from './User.js';
/**
 * @des
 * @author Bui Anh Hong
 * @date 15/2/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */
const lastMessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
 
const messageListSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    lastMessage: [lastMessageSchema],
  },
  {
    timestamps: true,
  },
);

const MessageList = mongoose.model('MessageList', messageListSchema);
export default MessageList;
