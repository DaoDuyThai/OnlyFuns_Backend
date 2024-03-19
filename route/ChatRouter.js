import express from 'express';
import { messageListController } from '../controllers/index.js';

const chatRouter = express.Router();

// Pass the reference to the controller function without executing it
chatRouter.get('/', messageListController.getAllMessageLists);
chatRouter.post('/create', messageListController.createMessageList);

export default chatRouter;
