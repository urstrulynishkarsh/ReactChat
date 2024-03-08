const express=require('express');
const path=require('path');
const http=require('http');
const socketio=require('socket.io');
const cors = require('cors');

const app=express()
const server=http.createServer(app);
// const io=socketio(server);
const Filter = require('bad-words')

const {addUser,removeUser,getUser,getUsersInRoom} =require('./Utils/Users');
const {generateMessage,generateLocationMessage}=require('./Utils/Messages');

const PORT=process.env.PORT||5000;

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
    credentials: true
  }
});


// Socket.IO CORS middleware
io.use((socket, next) => {
    // Set CORS headers for Socket.IO requests
    socket.handshake.headers.origin = socket.handshake.headers.referer;
    next();
});




io.on('connection',(socket)=>{
	console.log('New WebSocket Connection');

	// method ,options,callback
    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })
        
        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage(`${user.username}`, 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username}`, `${user.username} has joined!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()
    })

	socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
      
        const filter = new Filter();
        if (filter.isProfane(message)) {
            console.warn('Profanity is not allowed!');
            return;
        }
        io.to(user.room).emit('message', generateMessage(user.username, message));
        callback();
    });


    socket.on('typing', () => {
        const user = getUser(socket.id);
        if (user) { // Check if user exists
            socket.broadcast.to(user.room).emit('userTyping', `${user.username} is typing...`);
        }
    });

	socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })



	socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage(`${user.username}`, `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })


})


// default route 
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your socket is up and running....'
	});
});

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}!`)
})