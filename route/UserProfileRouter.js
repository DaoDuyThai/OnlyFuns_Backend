import express from 'express';
import { userProfileController } from '../controllers/index.js';
import { checkAuthorization } from '../middleware/Auth.js';
import UserProfile from "../models/UserProfile.js";

const userProfileRouter = express.Router();

// TODO: Add checkAuthorization in production
userProfileRouter.get('/',userProfileController.getMembers);
// userProfileRouter.route('/:id').get(userProfileController.getUserProfile);

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

// userProfileRouter.post('/follow', async (req, res) => {
//   try {
//     const { userIdSender, userIdReceiver } = req.body;
//     const senderProfile = await UserProfile.findOne({ userId: userIdSender });
//     const receiverProfile = await UserProfile.findOne({ userId: userIdReceiver });
//     if (!senderProfile || !receiverProfile) {
//       throw new Error('User profiles not found.');
//     }
//     const existingConnection = senderProfile.connections.find(connection => connection.userIdReceiver === userIdReceiver);
//     if (existingConnection && (existingConnection.status === 'pending' || existingConnection.status === 'agreed')) {
//       console.log('User is already followed or pending.');
//       throw new Error('User is already followed or pending.');
//     }
//     const ConnectionsSender = {
//       userIdSender: senderProfile.userId,
//       userIdReceiver: receiverProfile.userId,
//       status: 'pending',
//     };
//     const ConnectionsReceiver = {
//       userIdSender: senderProfile.userId,
//       userIdReceiver: receiverProfile.userId,
//       status: 'agreed',
//     };
//     senderProfile.connections.push(ConnectionsSender);
//     receiverProfile.connections.push(ConnectionsReceiver);
//     await senderProfile.save();
//     await receiverProfile.save();
//     res.status(200).send('Followed successfully.');
//   } catch (error) {
//     console.error('Error following user:', error);
//     res.status(500).send('Internal server error.');
//   }
// });
userProfileRouter.put('/edit/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { city, country, bio, backgroundPictureUrl, profilePictureUrl } = req.body;

    const updatedProfile = await UserProfile.findOneAndUpdate(
        { userId: userId },
        {
          $set: {
            'address.city': city,
            'address.country': country,
            bio: bio,
            backgroundPictureUrl: backgroundPictureUrl,
            profilePictureUrl: profilePictureUrl,
          }
        },
        { new: true }
    );

    if (!updatedProfile) {
      throw new Error('Profile not found');
    }

    res.send(updatedProfile);
    console.log(updatedProfile)
  } catch (error) {
    next(error);
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
userProfileRouter.post('/acceptfollow', async (req, res) => {
  const { userIdSender, userIdReceiver } = req.body;

  try {
    await UserProfile.findOneAndUpdate(
        { userId: userIdSender, 'connections.userIdReceiver': userIdReceiver },
        { $set: { 'connections.$.status': 'accepted' } }
    );

    await UserProfile.findOneAndUpdate(
        { userId: userIdReceiver, 'connections.userIdSender': userIdSender },
        { $set: { 'connections.$.status': 'accepted' } }
    );

    console.log('Followed successfully.');
    res.status(200).json({ message: 'Followed successfully.' });
  } catch (error) {
    console.error('Error accepting follow request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
userProfileRouter.post('/unfollow', async (req, res) => {
  const { userIdSender, userIdReceiver } = req.body;

  try {
    await UserProfile.findOneAndUpdate(
        { userId: userIdSender },
        { $pull: { connections: { userIdReceiver: userIdReceiver } } }
    );

    await UserProfile.findOneAndUpdate(
        { userId: userIdReceiver },
        { $pull: { connections: { userIdSender: userIdSender } } }
    );

    console.log('Unfollowed successfully.');
    res.status(200).json({ message: 'Unfollowed successfully.' });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// userProfileRouter.get('/:userId',userProfileController.getProfileByUserId);
export default  userProfileRouter ;
