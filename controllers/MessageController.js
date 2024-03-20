import Chat from '../repository/Chat.js';
/**
 * @des
 * @author
 * @date
 * @param {*} req
 * @param {*} res
 * @returns
 */

const getMessages = async (req, res) => {
    const { messageListId } = req.params.messageListId;
    try {
        const messages = await Chat.getMessages(messageListId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const addMessage = async (req, res) => {
    const { messageListId, content, sender } = req.body;
    try {
        const newMessage = await Chat.addMessage(messageListId, content, sender);
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { getMessages, addMessage };