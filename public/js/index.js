
const socket = io(); // initiating a request from client to server to open a web socket and keep that connection open

// ES6 features ain't working for other browsers
socket.on('connect', () => {
    console.log('Connected to server.');

    // socket.emit('createEmail', {
    //     to: 'sidon@zora.com',
    //     text: 'Hey Link, I miss you already.',
    // });

    socket.emit('createMessage', {
        from: 'sidon@zora.com',
        text: 'Hey Link, I miss you already.',
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server.');
});

// socket.on('newEmail', (email) => {
//     console.log('New email', email);
// });

socket.on('newMessage', (message) => {
    console.log('New message:', message);
});
