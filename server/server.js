const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const users = new Users();
const io = socketIO(server);
// above line returns a web socket server, whose job is admitting/listening to events
// and accept web socket connections

app.use(express.static(publicPath));
// console.log(__dirname + '/../public');
// console.log(publicPath);

// on() lets you register an event listener
// socket argument - represents the individual socket connected to server
io.on('connection', (socket) => {
    const admin = 'overlord';
    console.log('New user connected.');

    // setting acknowledgements via callback
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        // socket.leave(room) --- get kicked out of the room

        // io.emit -> io.to(room).emit
        // socket.broadcast.emit -> socket.broadcast.to(room).emit
        // socket.emit

        // a user can only join one room at a time
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage(admin, 'Welcome to the chat app!'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage(admin, `${params.name} has joined.`));

        return callback();
    });

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server.');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage(admin, coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
        const user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage(admin, `${user.name} has left :(`));
        }
    });
});

// app.listen() == http.createServer()
server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
