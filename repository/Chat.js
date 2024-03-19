import MessageList from '../models/MessageList.js';

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
const getAllMessageLists = async () => {
  try {
    const messageLists = await MessageList.find()
      .populate({
        path: 'participants',
        model: 'User',
        select: '_id username profile', // Include the profile reference field
      })
      .populate({
        path: 'lastMessage',
        model: 'Message',
        select: '_id content',
      });

    // Extract avatar URLs from user profiles and add them to participants
    const populatedMessageLists = messageLists.map((messageList) => {
      const participantsWithAvatar = messageList.participants.map(
        (participant) => {
          // Access the profile reference and retrieve the avatar URL
          const profilePictureUrl = participant.profile.profilePictureUrl;
          return {
            _id: participant._id,
            username: participant.username,
            avatar: profilePictureUrl, // Include the avatar URL in the participant object
          };
        },
      );

      // Replace the participants array with the updated array containing avatars
      return {
        ...messageList.toObject(),
        participants: participantsWithAvatar,
      };
    });

    return populatedMessageLists;
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default {
  createMessageList,
  getAllMessageLists,
};
