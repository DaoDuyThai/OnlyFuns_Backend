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
import server from './middleware/Chat.js';
import chatRouter from './route/ChatRouter.js';
import bodyParser from 'body-parser';
import UserProfile from './models/UserProfile.js';
import { Server } from 'socket.io';
import http from 'http';

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
const serverPort = 9090;
connectDB()
  .then(() => {
    console.log('Connect Database Success');
  })
  .catch((e) => console.error(e));

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
app.use(bodyParser.json());
//Todo:Enable in production
//app.use(checkToken)

app.use(morgan('combined'));

// Router
app.use('/', authRouter);
app.use('/user', userRouter);
app.use('/dash-board', dashBoardRouter);
app.use('/post', postRouter);
app.use('/members', userProfileRouter);
app.use('/profile', userProfileRouter);
app.use('/chat', chatRouter);
app.listen(port, async () => {
  console.log('Server node Js running on ' + port);
});
server.listen(serverPort, () => {
  console.log('Server socket.io running on ' + serverPort);
});
