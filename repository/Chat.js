import MessageList from '../models/MessageList.js';
import UserProfile from '../models/UserProfile.js';
import User from '../models/User.js';
import Message from '../models/Message.js';
const createMessageList = async (participants) => {
  try {
    // Check if a message list already exists with the provided participants
    const existingRoom = await MessageList.findOne({ participants });

    // If an existing message list is found, return it along with a signal indicating it was found
    if (existingRoom) {
      return { messageList: existingRoom, exists: true };
    }

    // If no existing message list is found, create a new one
    const newRoom = await MessageList.create({ participants });
    return { messageList: newRoom, exists: false };
  } catch (error) {
    throw new Error(error.toString());
  }
};

//   try {
//     // Find all message lists and populate participants
//     const messageLists = await MessageList.find({}).populate({
//       path: 'participants',
//       model: 'User', // Assuming User is the model for participants
//     });

//     // Extract user IDs from all participants in all message lists
//     const userIds = messageLists.reduce((acc, messageList) => {
//       messageList.participants.forEach((participant) => {
//         acc.add(participant._id);
//       });
//       return acc;
//     }, new Set());

//     // Fetch user profiles including profile pictures
//     const userProfiles = await UserProfile.find({
//       user: { $in: Array.from(userIds) },
//     });

//     // Map user profiles to participants in all message lists
//     messageLists.forEach((messageList) => {
//       messageList.participants.forEach((participant) => {
//         const userProfile = userProfiles.find((profile) =>
//           profile.user.equals(participant._id),
//         );
//         if (userProfile) {
//           participant.profilePicture = userProfile.profilePictureUrl;
//         }
//       });
//     });

//     // Return the populated message lists
//     return messageLists;
//   } catch (error) {
//     // Handle errors
//     throw new Error('Failed to fetch message lists: ' + error.message);
//   }
// };
const getAllMessageLists = async () => {
  try {
    const messageLists = await MessageList.find({}).populate({
      path: 'participants',
      model: 'User',
      select: 'username',
    });
    return messageLists;
  } catch (error) {
    throw new Error('Failed to fetch message lists: ' + error.message);
  }
};

const getMessages = async (messageListId) => {
  try {
    const messages = await Message.find({ messageList: messageListId })
      .sort({ timestamp: 1 }); // Sort messages by timestamp in ascending order
    return messages;
  } catch (error) {
    throw new Error('Failed to fetch messages: ' + error.message);
  }
};

const addMessage = async (messageListId, content, sender) => {
  try {
    const newMessage = await Message.create({
      messageListId,
      content,
      sender,
    });
    return newMessage;
  } catch (error) {
    throw new Error('Failed to add message: ' + error.message);
  }
};

export default {
  createMessageList,
  getAllMessageLists,
  getMessages,
  addMessage,
};
