import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  console.log('userId: ', userId);

  socket.on('connect', (data) => {
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  //connect to a room
  socket.on('joinRoom', (data) => {
    console.log(userId + ' joining Room:', data);
    socket.join(data);
  });
  // Send message to the specific room
  socket.on('sendMessage', (data) => {
    console.log('Object:', data);
    io.to(data.messageListId).emit('receiveMessage', data); // Emit the message content only
  });
});

export default server;
