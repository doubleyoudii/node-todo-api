var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    trim: true,
    required: true,
    minlength: 1
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {Todo};

// var newTodo = new Todo({
//   text: "Watch Lucifer"
// });

// newTodo.save().then((doc) => {
//   console.log(`${doc} is Saved`);
// }, (e) => {
//   console.log("Unable to save todo");
// });

// var newtodo2 = new Todo({
//   text: 'Eat Lunch',
//   completed: true,
//   completedAt: 1
// })

// newtodo2.save().then((doc) => {
//   console.log('save todo', doc);
// }, (err) => {
//   console.log('Unable to process todo');
// });
