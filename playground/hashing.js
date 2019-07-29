const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
}

const token = jwt.sign(data, '123abc');
console.log(token);

var decode = jwt.verify(token, '123abc');
console.log(decode);

// const message = 'I am Ironman';
// const hash = SHA256(message).toString();

// console.log(`Message is ${message}`);
// console.log(`the hashed is ${hash}`);