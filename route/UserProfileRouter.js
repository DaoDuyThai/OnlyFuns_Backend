import express from 'express';
import { userProfileController } from '../controllers/index.js';
import { checkAuthorization } from '../middleware/Auth.js';

const userProfileRouter = express.Router();

// TODO: Add checkAuthorization in production
userProfileRouter.get('/',userProfileController.getMembers);

export default  userProfileRouter ;
