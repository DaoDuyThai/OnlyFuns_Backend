import express from 'express';
import { authController } from '../controllers/index.js';

const authRouter = express.Router();

authRouter.post('/register', authController.registerUser);
authRouter.post('/refresh', authController.verifyRefreshToken);
authRouter.post('/login', authController.loginUser);
authRouter.post('/logout', authController.logout);
authRouter.post('/verify', authController.verifyUser);


export default  authRouter ;
