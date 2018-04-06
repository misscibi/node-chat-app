// eslint-disable-next-line arrow-body-style
const isRealString = (string) => {
    return typeof string === 'string' && string.trim().length > 0;
};

module.exports = { isRealString };
