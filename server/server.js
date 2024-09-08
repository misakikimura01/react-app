// chatにて使用
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

app.use(cors());

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('chatMessage', (msg) => {
    console.log('Message received: ', msg);
    io.emit('chatMessage', msg);  // メッセージを送信
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
