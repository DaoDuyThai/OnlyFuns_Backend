import express from 'express';
import { authController } from '../controllers/index.js';

const authRouter = express.Router();

authRouter.post('/register', authController.registerUser);

authRouter.post('/login', authController.loginUser);
authRouter.get('/verify/:verificationCode', authController.verifyUser);


export default  authRouter ;
