const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todos');
const {User} = require('../server/models/users');


// Todo.findByIdAndRemove(id).then((res)=> {
//   console.log(res)
// });

// Todo.findOneAndRemove({
//   _id: id
// }).then((res) => {
//   console.log(res);
// });