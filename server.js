/** 
 * @des 
 * @author Trịnh Minh Phúc
 * @date 29/01/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */
import express, { json } from 'express';
import * as dotenv from 'dotenv';
import connectDB from './connection/DBConnection.js';
import cors from "cors"

dotenv.config();
//Create 1 webserver
const app = express();
// Enable middleware that allows the Express server to work with JSON data
app.use(json());

app.use(
    cors({
      origin: process.env.CLIENT,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, 
    })
  );

app.get('/', (req, res) => {
    res.send("Welcome to Home page!");
});

const port = process.env.PORT || 8080;

app.listen(port, async () => {
    connectDB();
    console.log(`Web server running on: http://localhost:${port}`);
});