const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server); // returns a web socket server, whose job is admitting/listening to events and accept web socket connections

app.use(express.static(publicPath));
// console.log(__dirname + '/../public');
// console.log(publicPath);

// on() lets you register an event listener
// socket argument - represents the individual socket connected to server
io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });
});

// app.listen() == http.createServer()
server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
