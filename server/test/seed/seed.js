const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('../../models/todos');
const {User} = require('../../models/users');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const users = [{
  _id: userOneID,
  email: 'brotherWill@gmail.com',
  password: 'useronepass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneID, access: 'auth'}, 'abc123').toString()
  }]
},{
  _id: userTwoID,
  email: 'kate@gamil.com',
  password: 'usertwopass'
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

var populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    Promise.all([userOne, userTwo])
  }).then(() => done());

};

var populateTodos = (done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  })
  .then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};