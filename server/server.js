const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
// above line returns a web socket server, whose job is admitting/listening to events
// and accept web socket connections

app.use(express.static(publicPath));
// console.log(__dirname + '/../public');
// console.log(publicPath);

// on() lets you register an event listener
// socket argument - represents the individual socket connected to server
io.on('connection', (socket) => {
    const admin = 'admin@hatenolabs.com';
    console.log('New user connected.');

    // socket.emit from Admin
    socket.emit('newMessage', generateMessage(admin, 'Welcome to the chat app!'));

    // socket.broadcast.emit from Admin
    socket.broadcast.emit('newMessage', generateMessage(admin, 'New user has joined.'));

    socket.on('createMessage', (message) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });
});

// app.listen() == http.createServer()
server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
