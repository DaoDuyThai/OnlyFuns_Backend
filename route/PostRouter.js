import express from 'express';
import {
  addPostComment,
  createPost,
  getPostByID,
  getPostReports,
  getPosts,
} from '../controllers/PostController.js';

const postRouter = express.Router();
// Todo: Add checkAuthorization in production
postRouter.route('/').get(getPosts).post(createPost);
postRouter.route('/report').get(getPostReports);
postRouter.route('/:id').get(getPostByID);
postRouter.route('/comment').post(addPostComment);
export default postRouter;
