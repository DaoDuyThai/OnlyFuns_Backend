import express from 'express';
import { userProfileController } from '../controllers/index.js';
import { checkAuthorization } from '../middleware/Auth.js';

const userProfileRouter = express.Router();

// TODO: Add checkAuthorization in production
userProfileRouter.get('/',userProfileController.getMembers);
userProfileRouter.route('/:id').get(userProfileController.getUserProfile);

userProfileRouter.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const userProfile = await UserProfile.findOne({ userId: id });
      if (!userProfile) {
        throw new Error('User profile not found.');
      }
      res.status(200).json(userProfile);
    } catch (error) {
      console.error('Error getting user profile:', error);
      res.status(500).send('Internal server error.');
    }
});

userProfileRouter.post('/follow', async (req, res) => {
  try {
    const { userIdSender, userIdReceiver } = req.body;
    const senderProfile = await UserProfile.findOne({ userId: userIdSender });
    const receiverProfile = await UserProfile.findOne({ userId: userIdReceiver });
    if (!senderProfile || !receiverProfile) {
      throw new Error('User profiles not found.');
    }
    const existingConnection = senderProfile.connections.find(connection => connection.userIdReceiver === userIdReceiver);
    if (existingConnection && (existingConnection.status === 'pending' || existingConnection.status === 'agreed')) {
      console.log('User is already followed or pending.');
      throw new Error('User is already followed or pending.');
    }
    const ConnectionsSender = {
      userIdSender: senderProfile.userId,
      userIdReceiver: receiverProfile.userId,
      status: 'pending',
    };
    const ConnectionsReceiver = {
      userIdSender: senderProfile.userId,
      userIdReceiver: receiverProfile.userId,
      status: 'agreed',
    };
    senderProfile.connections.push(ConnectionsSender);
    receiverProfile.connections.push(ConnectionsReceiver);
    await senderProfile.save();
    await receiverProfile.save();
    res.status(200).send('Followed successfully.');
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).send('Internal server error.');
  }
});







export default  userProfileRouter ;
