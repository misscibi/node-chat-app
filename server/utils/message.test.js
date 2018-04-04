const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', (done) => {
        // store res in variable
        const from = 'Link';
        const text = 'Hi Sidon!';
        const message = generateMessage(from, text);

        // assert from match
        // expect(result.from).toBe(from);
        // assert text match
        // expect(result.text).toBe(text);
        // assert createdAt is number
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, text });
        done();
    });
});
