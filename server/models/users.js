var mongoose = require('mongoose'); 
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//Refactored @ jsonwebtoken!!!
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: (value) => {
        // validator npm package (3rd Party)
        return validator.isEmail(value);
      },
      message: (props) => `${props.value} is not a valid email`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  })
};


UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (err) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token' : token,
    'tokens.access' : 'auth'
  });
};



var User = mongoose.model('User', UserSchema);

module.exports = {User};

// var newUser = new User({
//   email: '   willyumburger@gmail.com   '
// })

// newUser.save().then((doc) => {
//   console.log('New User', doc)
// }, (err) => {
//   console.log('Unable to proocess', err);
// })