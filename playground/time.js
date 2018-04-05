const moment = require('moment');

// Jan 1st 1970 00:00:00 am === 0

// const date = new Date();
// var months = ['Jan', 'Feb'];
// console.log(date.getMonth());

// new Date().getTime()
const someTimestamp = moment().valueOf();
console.log(someTimestamp);

const createdAt = 1234;
const date = moment(createdAt);
date.add(100, 'year').subtract(9, 'months');

console.log(date.format('MMM Do, YYYY')); // Apr 13th, 2016
console.log(date.format('MMM')); // Apr

// 10:35 am
console.log(date.format('h:mm a'));
