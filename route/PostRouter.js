import express from "express";
import {createPost, getPostReports, getPosts} from "../controllers/PostController.js";

const postRouter = express.Router();
postRouter.route('/').get(getPosts).post(createPost)
postRouter.route('/report').get(getPostReports)
export default postRouter