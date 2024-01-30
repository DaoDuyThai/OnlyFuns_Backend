import express, { json } from 'express';
import * as dotenv from 'dotenv';
import connectDB from './connection/DBConnection.js';
import cors from "cors"
import { authRouter,userRouter } from './route/index.js';
import morgan from 'morgan';
import { checkAuthorization } from './middleware/Auth.js';
import { checkToken } from './middleware/Auth.js';
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
// Enable middleware that allows the Express server to work with JSON data
app.use(json());

// Middleware để kiểm soát mọi request đi đến express server
app.use(checkToken)
app.use(checkAuthorization)


app.use(morgan('combined'))
// Cấu hình sever chỉ cho client chạy trên Port:3000
app.use(
    cors({
      origin: process.env.CLIENT,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, 
    })
  );
// Router
app.use("/", authRouter)
app.use("/user", userRouter)

app.listen(port, async () => {
  console.log("Server node Js running on " + port);
});