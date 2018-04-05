const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', (done) => {
        // store res in variable
        const from = 'Link';
        const text = 'Hi Sidon!';
        const message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, text });
        done();
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', (done) => {
        const from = 'Sidon';
        const latitude = 1;
        const longitude = 1;
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const message = generateLocationMessage(from, latitude, longitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from });
        expect(message.url).toBe(url);
        done();
    });
});
