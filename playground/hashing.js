const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// var data = {
//   id: 10
// }

// const token = jwt.sign(data, '123abc');
// console.log(token);

// var decode = jwt.verify(token, '123abc');
// console.log(decode);

// const message = 'I am Ironman';
// const hash = SHA256(message).toString();

// console.log(`Message is ${message}`);
// console.log(`the hashed is ${hash}`);

//`````````````````````````````````````````````````````````````

var pword = 'abc123?';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(pword, salt, (err, hash) => {
//     console.log(hash);
//   });
// });
var hashedpw = '$2a$10$0DzFCRPOi6GDFmk.i6WmEe5q0PqCRpR7sehHdmOQiU8EuF/b9JUR2';

bcrypt.compare(pword, hashedpw, (err, res) => {
  console.log(res);
});