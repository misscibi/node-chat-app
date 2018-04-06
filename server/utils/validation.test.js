const expect = require('expect');

// import isRealString
const { isRealString } = require('./validation');

// isRealString
//      should reject non-string values
//      should reject string with only spaces
//      should allow string with non-space characters
describe('isRealString', () => {
    it('should reject non-string values', (done) => {
        expect(isRealString(12345)).toBe(false);
        done();
    });

    it('should reject string with only spaces', (done) => {
        expect(isRealString('    ')).toBe(false);
        done();
    });

    it('should allow string with non-space characters', (done) => {
        expect(isRealString('nonspace')).toBe(true);
        done();
    });
});
