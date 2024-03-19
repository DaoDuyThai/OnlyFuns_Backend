import Chat from '../repository/Chat.js';
/**
 * @des
 * @author
 * @date
 * @param {*} req
 * @param {*} res
 * @returns
 */
const createMessageList = async (req, res) => {
  try {
    const { participants } = req.body;

    // Call the createMessageList function to create or find a message list
    const { messageList, exists } = await Chat.createMessageList(participants);

    if (exists) {
      // Handle the case where an existing message list was found
      res
        .status(200)
        .json({ message: 'Existing message list found', messageList });
    } else {
      // Handle the case where a new message list was created
      res
        .status(201)
        .json({ message: 'New message list created', messageList });
    }
  } catch (error) {
    console.error('Error creating message list:', error);
    res.status(500).json({ error: 'Failed to create message list' });
  }
};
const getAllMessageLists = async (req, res) => {
  try {
    const messageList = await Chat.getAllMessageLists();
    res.status(200).json(messageList);
  } catch (error) {
    console.error('Error getting message lists:', error);
    res.status(500).json({ error: 'Failed to get message lists' });
  }
};

export default {
  createMessageList,
  getAllMessageLists,
};
