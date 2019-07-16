var mongoose = require('mongoose');

var User = mongoose.model('User', {
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 1
  }
});

module.exports = {User};

// var newUser = new User({
//   email: '   willyumburger@gmail.com   '
// })

// newUser.save().then((doc) => {
//   console.log('New User', doc)
// }, (err) => {
//   console.log('Unable to proocess', err);
// })