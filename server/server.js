const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server); // returns a web socket server, whose job is admitting/listening to events and accept web socket connections

app.use(express.static(publicPath));
// console.log(__dirname + '/../public');
// console.log(publicPath);

// on() lets you register an event listener
// socket argument - represents the individual socket connected to server
io.on('connection', (socket) => {
    console.log('New user connected.');

    // Creating an event
    // socket.emit('newEmail', {
    //     from: 'link@hyrule.com',
    //     text: 'Hey Sidon. What up?',
    //     createAt: 123,
    // });
    //
    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });

    socket.emit('newMessage', {
        from: 'link@hyrule.com',
        text: 'Hey Sidon. What up?',
        createdAt: new Date(),
    });

    socket.on('createMessage', (newMessage) => {
        // console.log('createEmail', newEmail);
        const message = newMessage;
        message.createdAt = new Date();
        socket.emit('newMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });
});

// app.listen() == http.createServer()
server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
