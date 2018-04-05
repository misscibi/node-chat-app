// initiating a request from client to server to open a web socket and keep that connection open
const socket = io();

// ES6 features ain't working for other browsers
socket.on('connect', () => {
    console.log('Connected to server.');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server.');
});

socket.on('newMessage', (message) => {
    console.log('New message:', message);
    const li = jQuery('<li></li>'); // use JQuery to create an element
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
    const li = jQuery('<li></li>');
    const a = jQuery('<a target="_blank">My current location~~~</a>');

    // below functions prevent injection
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', (event) => {
    event.preventDefault();

    const messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'anonymous',
        text: messageTextbox.val(),
    }, () => {
        // acknowledgement callback
        messageTextbox.val('');
    });
});

const locationButton = jQuery('#send-location');
// eslint-disable-next-line consistent-return
locationButton.on('click', (event) => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sharing location...');

    navigator.geolocation.getCurrentPosition((position) => {
        locationButton.removeAttr('disabled').text('Share location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    }, () => {
        locationButton.removeAttr('disabled').text('Share location');
        alert('Unable to fetch location.');
    });
});
