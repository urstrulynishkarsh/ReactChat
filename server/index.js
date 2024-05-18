const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const multer = require("multer");
const app = express();
const fs = require('fs');


const server = http.createServer(app);
// const io=socketio(server);
const Filter = require("bad-words");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./Utils/Users");

const {
  generateMessage,
  generateLocationMessage,
} = require("./Utils/Messages");

const PORT = process.env.PORT || 5000;

// Use cors middleware with WebSocket support
// app.use(cors({
//     origin: 'http://localhost:3000', // Adjust this based on your React app's origin
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
// }));

app.use(cors());

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
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
  const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_AWS_SECRET_ACCESS_KEY',
  region: 'YOUR_AWS_REGION'
});
  const uploadFileToS3 = async (base64Data, filename) => {
    const buffer = Buffer.from(base64Data, 'base64');
    const params = {
      Bucket: 'YOUR_AWS_S3_BUCKET_NAME',
      Key: filename,
      Body: buffer,
      ContentType: 'application/octet-stream'
    };
  
    try {
      const { Location } = await s3.upload(params).promise();
      const presignedUrl = await s3.getSignedUrlPromise('getObject', {
        Bucket: 'YOUR_AWS_S3_BUCKET_NAME',
        Key: filename,
        Expires: 3600 // URL expires in 1 hour
      });
  
      return presignedUrl;
    } catch (err) {
      console.error('Error uploading file to S3:', err);
      throw err;
    }
  };
const storeFile = (base64Data, filename) => {
  // Convert the base64 string back to binary data
  const data = Buffer.from(base64Data, 'base64');

  // Create a path for the new file
  const filePath = path.join(__dirname, 'uploads', filename);

  // Write the data to a new file
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error('Error writing file', err);
    } else {
      console.log('File saved successfully');
    }
  });
};
socket.on("sendFile", async (data) => {
  const { base64Data, filename, userId } = data;
  const user = getUser(userId);
  if (user) {
    try {
      const fileUrl = await uploadFileToS3(base64Data, filename);
      io.emit("fileMessage", {
        username: user.username,
        fileUrl,
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error handling file upload:', err);
    }
  } else {
    console.log('No user found with id:', userId);
  }
});

  const fs = require('fs');
const path = require('path');
 
const cleanupFileStorage = (userId) => {
  // Create a path for the user's files
  const filePath = path.join(__dirname, 'uploads', userId);

  // Remove the user's files
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error removing file', err);
    } else {
      console.log('File removed successfully');
    }
  });
};
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
  
    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage(`${user.username}`, `${user.username} has left!`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
  
      // Clean up file storage for the disconnected user
      cleanupFileStorage(user.id);
    }
  });
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    const filter = new Filter();
    if (filter.isProfane(message)) {
      console.warn("Profanity is not allowed!");
      return;
    }
    io.to(user?.room).emit("message", generateMessage(user.username, message));
    callback();
  });

  socket.on("START_TYPING", () => {
    const user = getUser(socket.id);
    if (user) {
      // Check if user exists
      socket.broadcast
        .to(user?.room)
        .emit("USER_TYPING_START", `${user?.username} is typing...`);
    }
  });
  socket.on("STOP_TYPING", () => {
    const user = getUser(socket.id);
    if (user) {
      // Check if user exists
      socket.broadcast.to(user?.room).emit("STOP_USER_TYPING", ``);
    }
  });

  socket.on("sendLocation", (coords, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(
        user.username,
        `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
      )
    );
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

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
