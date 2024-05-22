import express from "express";
import path from "path";
import http from "http";
import { Server as ServerSocketIO } from "socket.io";
import cors, { CorsOptions } from "cors";
import Filter from "bad-words";

import { addUser, removeUser, getUsersInRoom, getUser } from "./Utils/Users";
import { generateMessage, generateLocationMessage } from "./Utils/Messages";

const app = express();
const server = http.createServer(app);
// const io=socketio(server);

const PORT = process.env.PORT || 4000;

// Use cors middleware with WebSocket support
// app.use(cors({
//     origin: 'http://localhost:3000', // Adjust this based on your React app's origin
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
// }));

app.use(cors());

const corsInit: CorsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["my-custom-header"],
  credentials: true,
};

const io = new ServerSocketIO(server, {
  cors: corsInit,
});

// Socket.IO CORS middleware
io.use((socket, next) => {
  // Set CORS headers for Socket.IO requests
  socket.handshake.headers.origin = socket.handshake.headers.referer;
  next();
});

io.on("connection", (socket) => {
  console.log("New WebSocket Connection");

  // method ,options,callback
  socket.on("join", (options, callback) => {
    const { status, error, user } = addUser({ id: socket.id, ...options });

    if (!status) {
      return callback({
        status,
        error,
      });
    }

    socket.join(user.room);

    socket.emit("message", generateMessage(`${user.username}`, "Welcome!"));
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        generateMessage(`${user.username}`, `${user.username} has joined!`)
      );
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback({
      status,
      error,
    });
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(parseInt(socket.id));

    const filter = new Filter();
    if (filter.isProfane(message)) {
      console.warn("Profanity is not allowed!");
      return;
    }
    if (user) {
      io.to(user.room).emit("message", generateMessage(user.username, message));
    }
    callback();
  });

  socket.on("START_TYPING", () => {
    const user = getUser(parseInt(socket.id));
    if (user) {
      // Check if user exists
      socket.broadcast
        .to(user?.room)
        .emit("USER_TYPING_START", `${user?.username} is typing...`);
    }
  });
  socket.on("STOP_TYPING", () => {
    const user = getUser(parseInt(socket.id));
    if (user) {
      // Check if user exists
      socket.broadcast.to(user?.room).emit("STOP_USER_TYPING", ``);
    }
  });

  socket.on("sendLocation", (coords, callback) => {
    const user = getUser(parseInt(socket.id));

    if (user) {
      io.to(user.room).emit(
        "locationMessage",
        generateLocationMessage(
          user.username,
          `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
        )
      );
    }
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(parseInt(socket.id));

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage(`${user.username}`, `${user.username} has left!`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

// default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your socket is up and running....",
  });
});

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}!`);
});
