// initiating a request from client to server to open a web socket and keep that connection open
const socket = io();

// ES6 features ain't working for other browsers
socket.on('connect', () => {
    console.log('Connected to server.');

    // socket.emit('createMessage', {
    //     from: 'sidon@zora.com',
    //     text: 'Sidon is connected.',
    // });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server.');
});

socket.on('newMessage', (message) => {
    console.log('New message:', message);
});
