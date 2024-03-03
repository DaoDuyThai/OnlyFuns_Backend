import express, { json } from 'express';
import * as dotenv from 'dotenv';
import connectDB from './connection/DBConnection.js';
import cors from 'cors';
import {
  authRouter,
  userRouter,
  dashBoardRouter,
  postRouter,
  userProfileRouter,
} from './route/index.js';
import morgan from 'morgan';
import { checkAuthorization } from './middleware/Auth.js';
import { checkToken } from './middleware/Auth.js';
import cookieParser from 'cookie-parser';
/**
 * @des
 * @author Trịnh Minh Phúc
 * @date 29/01/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */

dotenv.config();
//Create 1 webserver
const app = express();
const port = process.env.PORT || 8080;
connectDB();
app.use(
  cors({
    origin: process.env.CLIENT,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }),
);
// Enable middleware that allows the Express server to work with JSON data
app.use(json());
app.use(cookieParser());

// app.use(checkAuthorization)

app.use(morgan('combined'));

// app.use(checkToken);
// Router
app.use('/', authRouter);
app.use('/user', userRouter);
app.use('/dash-board', dashBoardRouter);
app.use('/post', postRouter);
app.use('/members', userProfileRouter);
app.listen(port, async () => {
  console.log('Server node Js running on ' + port);
});
