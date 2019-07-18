const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');
// var id = '5d2f35e7ba28650bd970972a11';
var id = '5d2c47cec4d68edc6f4c3986';

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     console.log('Cant find todo');
//   }
//   console.log('Todo', todo);
// }).catch((err) => {
//   console.log('Error with', err);
// })

User.findById(id).then((userrr) => {
  if(!userrr) {
    console.log('Cant Find The User');
  }

  console.log('the user is', userrr);
}).catch((err) => {
  console.log('Invalid with the error of', err);
});