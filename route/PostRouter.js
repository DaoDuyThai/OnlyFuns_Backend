import express from "express";
import {createPost, getPostReports, getPosts} from "../controllers/PostController.js";

const postRouter = express.Router();
// Todo: Add checkAuthorization in production
postRouter.route('/').get(getPosts).post(createPost)
postRouter.route('/report').get(getPostReports)
export default postRouter