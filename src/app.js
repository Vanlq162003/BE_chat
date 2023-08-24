import express from "express";
import dotenv from 'dotenv'
import http from 'http'
import { Server } from "socket.io";
import cors from 'cors'
import mongoose from "mongoose";
import { errorHandler, notFound } from "./middlewares/errorMiddleware";
import routerUser from "./routes/userRoutes";
import routerChat from "./routes/chatRoutes";
import routerMessage from "./routes/messageRoutes";


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Đổi thành đúng URL của trang web của bạn
  },
})



io.on('connection', (socket) => {
  // console.log('A user connected');

  socket.on('setup', (userData) => {
    socket.join(userData._id)
    socket.emit('connected')
  })
  socket.on('join chat', (room) => {
    socket.join(room)
    console.log('user joined room: ' + room)
  })
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  socket.on('new message', (newMessageRecieved) => {
    var chat = newMessageRecieved.chat
    console.log(newMessageRecieved)


    if (!chat.users) console.log('chat.user không tồn tại')

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      // io.sockets.to(user._id).emit("message recieved", newMessageRecieved);
      // io.sockets.in(user._id).emit('message recieved', newMessageRecieved);
      // socket.in(user._id).emit("message recieved" , newMessageRecieved)
      io.emit('message recieved', newMessageRecieved)
      
    });
  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.use(express.json());

const port = process.env.PORT || 8080



app.get('/', (req, res) => {
  res.send('Welcome to my API');
})

app.use('/api', routerChat)
app.use('/api', routerUser)
app.use('/api', routerMessage)
app.use(notFound)
app.use(errorHandler)



mongoose.connect("mongodb://127.0.0.1:27017/Backend-chatapp")

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});













