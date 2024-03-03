import express from 'express';
import { userController } from '../controllers/index.js';
import { checkAuthorization } from '../middleware/Auth.js';


const userRouter = express.Router();

userRouter.get('/', checkAuthorization, userController.getAllUser);



export default userRouter;
