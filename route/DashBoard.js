import express from 'express';
import { userController } from '../controllers/index.js';

const router = express.Router();
// Todo: Add checkAuthorization in production
router.route('/user-last-7-days').get(userController.getUserForLast7Days);

export default router;