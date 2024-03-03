import express from 'express';
import {userController} from '../controllers/index.js';
import {checkAuthorization} from '../middleware/Auth.js';


const userRouter = express.Router();
// Todo: Add checkAuthorization in production
userRouter.route('/').get(userController.getAllUser);
userRouter.route('/:id').get(userController.getUser);


export default userRouter;
