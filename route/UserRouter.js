import express from 'express';
import { userController } from '../controllers/index.js';
import { checkAuthorization } from '../middleware/Auth.js';

const userRouter = express.Router();

// TODO: Add checkAuthorization in production
userRouter.get('/',userController.getAllUser);

export default  userRouter ;
