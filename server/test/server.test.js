// const expect = require('expect');
// const request = require('supertest');

// const {ObjectID} = require('mongodb'); //to access id


// //```````````local`````````````````````````````
// const {app} = require('./../server');
// const {Todo} = require('./../models/todos');

// const todoes = [{
//   _id: new ObjectID(),            //refactored ***/
//   text: "To do First test"
// }, {
//   _id: new ObjectID(),            //refactored ***/
//   text: "To do Second Test",
//   completed: true,                //refactored **/*
//   completedAt: 444                //refactored **/*
// }]; 

// //``Fix for expecting with zero database``````
// beforeEach((done) => {
//   // Todo.remove({}).then(() => done());

//   //`````Refactored for testing Get TODOS````
//   Todo.remove({}).then(() => {
//    return Todo.insertMany(todoes);
//   }).then(() => done());
//   // .catch((e) => {
//   //   console.log('error here');
//   // });
// });


// describe('POST /todo', () => {

//   it('should create a new TODO', (done) => {
//     var text = 'Test todo text';
//     request(app)
//       .post('/todos')
//       .send({text})
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.text).toBe(text)
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }

//         // Todo.find().then((todos) => {
//         Todo.find({text}).then((todos) => {   //refactored ****
//           expect(todos.length).toBe(1);
//           expect(todos[0].text).toBe(text);
//           done();
//         }).catch((e) => done(e));
//       });
//   });

//   it('should not create a invalid todo', (done) => {
//     request(app)
//       .post('/todos')
//       .send({})
//       .expect(400)
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }

//         Todo.find().then((todos) => {
//           // expect(todos.length).toBe(0);
//           expect(todos.length).toBe(2); //Refactored "2"    ****
//           done();
//         }).catch((e) => done(e));
//       });
//   });
// });

// describe('GET /todos', () => {
//   it('should get all todos', (done) => {
//     request(app)
//       .get('/todos')
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todos.length).toBe(2);
//       })
//       .end(done);
//   });
// });


// describe('GET /todo/:iid', () => {
//   it('should return todo doc', (done) => {
//     request(app)
//       .get(`/todos/${todoes[0]._id.toHexString()}`)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo.text).toBe(todoes[0].text);
//       })
//       .end(done);

//   });

//   it('should return error 404 if todo not found', (done) => {
//     //make sure you get 404 back
//     var id = new ObjectID();
//     request(app)
//       .get(`/todos/${id.toHexString()}`)
//       .expect(404)
//       .end(done);
//   });

//   it('should return 404 if todo is not valid', (done) => {
//     var id = 123;
//     request(app)
//       .get(`/todos/${id}`)
//       .expect(404)
//       .end(done);
//   });
// });


// describe('DELETE /todo/:id', () => {

//   it('should remove a todo', (done) => {
//     var hexId = todoes[1]._id.toHexString();
//     request(app)
//       .delete(`/todos/${hexId}`)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo._id).toBe(hexId);
//       })
//       .end((err, res) => {
//         if(err) {
//           return done(err);
//         }

//         Todo.findById(hexId).then((id) => {
//           expect(id).toNotExist();
//           done();
//         })
//         .catch((e) => done(e));
//       });
      
//   });

//   it('should return 404 if todo not found', (done) => {
//     var id = new ObjectID();
//     request(app)
//       .delete(`/todos/${id.toHexString()}`)
//       .expect(404)
//       .end(done);
//   });

//   it('should return 404 if object Id is not valid', (done) => {
//     var id = 123;
//     request(app)
//       .delete(`/todos/${id}`)
//       .expect(404)
//       .end(done);
//   });

// });

// describe('PATCH /todos/:id', () => {

//   it('should update the todo', (done) => {
//     var id = todoes[0]._id.toHexString();
//     var update = {
//       text: 'Testing Patch',
//       completed: true,
//     };
//     request(app)
//       .patch(`/todos/${id}`)
//       .send(update)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo.text).toBe('Testing Patch');
//         expect(res.body.todo.completed).toBe(true);
//         expect(res.body.todo.completedAt).toBeA('number');
//       })
//       .end(done 
//         // (err, res) => {
//         // if (err) {
//         //   return done(err);
//         // }

//         // Todo.findByIdAndUpdate(id).then((todo) => {
//         //   expect(todo.completed).toBe(true);
//         //   expect(todo.completedAt).toBeA('number');
//           // done()
//         // }
        
      
//       );
//   });

//   it('should clear up completedAt when todo is not completed', (done) => { 
//     var id = todoes[1]._id.toHexString();
//     var text = 'Testing Patch nmber 2';

//     request(app)
//       .patch(`/todos/${id}`)
//       .send({
//         completed: false,
//         text
//       })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo.text).toBe(text);
//         expect(res.body.todo.completed).toBe(false);
//         expect(res.body.todo.completedAt).toNotExist(); 
//       })
//       .end(done);
//       // .catch((e) => done(e));
//   });
// });

const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todos');
const {User} = require('./../models/users');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');



// beforeEach((done) => {
//   Todo.remove({}).then(() => {
//     return Todo.insertMany(todos);
//   })
//   .then(() => done());
// });

// beforeEach(populateTodos);
// beforeEach(populateUsers);
describe('hooks', function() { 

  beforeEach(populateTodos);
  beforeEach(populateUsers);

  //``````````````````````````````````````````````````````
  // test cases
  describe('POST /todos', () => {

    it('should create a new todo', (done) => {
      var text = 'Test todo text';
  
      request(app)
        .post('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .send({text})
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          Todo.find({text}).then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((e) => done(e));
 
        });
    });
  
    it('should not create todo with invalid body data', (done) => {
      request(app)
        .post('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          Todo.find().then((todos) => {
            expect(todos.length).toBe(2);
            done();
          }).catch((e) => done(e));
        });
    });
  });
  //``````````````````````````````````````````````````````
  describe('GET /todos', () => {
    it('should get all todos', (done) => {
      request(app)
        .get('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
          expect(res.body.todos.length).toBe(1);
        })
        .end(done);
    });
  });
  //``````````````````````````````````````````````````````  
  describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should not return todo doc created by other user', (done) => {
      request(app)
        .get(`/todos/${todos[1]._id.toHexString()}`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(404)
        .end(done);
    });
  
    it('should return 404 if todo not found', (done) => {
      var hexId = new ObjectID().toHexString();
  
      request(app)
        .get(`/todos/${hexId}`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(404)
        .end(done);
    });
  
    it('should return 404 for non-object ids', (done) => {
      request(app)
        .get('/todos/123abc')
        .set('x-auth', users[0].tokens[0].token)
        .expect(404)
        .end(done);
    });
  });
  //``````````````````````````````````````````````````````
  describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
      var hexId = todos[1]._id.toHexString();
  
      request(app)
        .delete(`/todos/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          Todo.findById(hexId).then((todo) => {
            expect(todo).toNotExist();
            done();
          }).catch((e) => done(e));
        });
    });

    it('should not remove a todo that is not belong there', (done) => {
      var hexId = todos[0]._id.toHexString();
  
      request(app)
        .delete(`/todos/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          Todo.findById(hexId).then((todo) => {
            expect(todo).toExist();
            done();
          }).catch((e) => done(e));
        });
    });
  
    it('should return 404 if todo not found', (done) => {
      var hexId = new ObjectID().toHexString();
  
      request(app)
        .delete(`/todos/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .expect(404)
        .end(done);
    });
  
    it('should return 404 if object id is invalid', (done) => {
      request(app)
        .delete('/todos/123abc')
        .set('x-auth', users[1].tokens[0].token)
        .expect(404)
        .end(done);
    });
  });
  //``````````````````````````````````````````````````````
  describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
      var hexId = todos[0]._id.toHexString();
      var text = 'This should be the new text';
  
      request(app)
        .patch(`/todos/${hexId}`)
        .set('x-auth', users[0].tokens[0].token)
        .send({
          completed: true,
          text
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(true);
          expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done);
    });

    it('should not update the todo of others', (done) => {
      var hexId = todos[0]._id.toHexString();
      var text = 'This should be the new text';
  
      request(app)
        .patch(`/todos/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .send({
          completed: true,
          text
        })
        .expect(404)
        .end(done);
    });
  
    it('should clear completedAt when todo is not completed', (done) => {
      var hexId = todos[0]._id.toHexString();
      var text = 'This should be the new text!!';
  
      request(app)
        .patch(`/todos/${hexId}`)
        .set('x-auth', users[0].tokens[0].token)
        .send({
          completed: false,
          text
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(false);
          expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done);
    });
  });
  //``````````````````````````````````````````````````````
  describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
      request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
          expect(res.body._id).toBe(users[0]._id.toHexString());
          expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });

    it('should not return users if not authenticated', (done) => {
      request(app)
        .get('/users/me')
        .expect(401)
        .expect((res) => {
          expect(res.body).toEqual({});
        })
        .end(done);
    });

  });
  //``````````````````````````````````````````````````````
  describe('POST /users', () => {
    it('shoould create user', (done) => {
      var email = 'example@example.com';
      var password = '123abc';

      request(app)
        .post('/users')
        .send({email, password})
        .expect(200)
        .expect((res) => {
          expect(res.header['x-auth']).toExist();     //why use ['x-auth'] instad of '.something"
          expect(res.body._id).toExist();
          expect(res.body.email).toBe(email);

        })
        .end((err) => {
          if (err) {
            return done(err);
          }

          User.findOne({email}).then((user) => {
            expect(user).toExist();
            expect(user.password).toNotEqual(password);
            done();
          })
        });
    });

    it('should return validation error if request is invalid', (done) => {
      var email = 'exampleexamplecom';
      var password = '123';

      request(app) 
        .post('/users')
        .send({email, password})
        .expect(400)
        .end(done);
    });

    it('should not create user if email is i use', (done) => {
      var email = 'kate@gamil.com';
      var password = 'pwmoto123';

      request(app)
        .post('/users')
        .send({email, password})
        .expect(400)
        .end(done);
      
    });
  });
  //``````````````````````````````````````````````````````
  describe('POST /users/login', () => {

    it('should login and return auth token', (done) => {
      request(app)
        .post('/users/login')
        .send({
          email: users[1].email,
          password: users[1].password
        })
        .expect(200)
        .expect((res) => {
          expect(res.headers['x-auth']).toExist()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          User.findById(users[1]._id).then((user) => {
            expect(user.tokens[1]).toInclude({
              access: 'auth',
              token: res.headers['x-auth']
            });
            done();
          }).catch((e) => done(e));
        });
    });

    it('should reject invalid auth token', (done) => {
      request(app)
        .post('/users/login')
        .send({
          email: users[1].email,
          password: 'random'
        })
        .expect(400)
        .expect((res) => {
          expect(res.headers['x-auth']).toNotExist()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          User.findById(users[1]._id).then((user) => {
            expect(user.tokens.length).toBe(1);
            done();
          }).catch((e) => done(e));
        });
    });
  }); 
  //``````````````````````````````````````````````````````
  describe('DELETE /users/me/token', () => { 
    it('should remove token on logout', (done) => {
      request(app)
        .delete('/users/me/token')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          User.findById(users[0]._id).then((user) => {
            expect(user.tokens.length).toBe(0);
            done();
          }).catch((e) => done(e));
        });
    });
  });









});

// describe('POST /todos', () => {

  

//   it('should create a new todo', (done) => {
//     var text = 'Test todo text';

//     request(app)
//       .post('/todos')
//       .send({text})
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.text).toBe(text);
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }

//         Todo.find({text}).then((todos) => {
//           expect(todos.length).toBe(1);
//           expect(todos[0].text).toBe(text);
//           done();
//         })
//         .catch((e) => done(e));
//       });
//   });

//   it('should not create todo with invalid body data', (done) => {
//     request(app)
//       .post('/todos')
//       .send({})
//       .expect(400)
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }

//         Todo.find().then((todos) => {
//           expect(todos.length).toBe(2);
//           done();
//         }).catch((e) => done(e));
//       });
//   });
// });

// describe('GET /todos', () => {
//   it('should get all todos', (done) => {
//     request(app)
//       .get('/todos')
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todos.length).toBe(2);
//       })
//       .end(done);
//   });
// });

// describe('GET /todos/:id', () => {
//   it('should return todo doc', (done) => {
//     request(app)
//       .get(`/todos/${todos[0]._id.toHexString()}`)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo.text).toBe(todos[0].text);
//       })
//       .end(done);
//   });

//   it('should return 404 if todo not found', (done) => {
//     var hexId = new ObjectID().toHexString();

//     request(app)
//       .get(`/todos/${hexId}`)
//       .expect(404)
//       .end(done);
//   });

//   it('should return 404 for non-object ids', (done) => {
//     request(app)
//       .get('/todos/123abc')
//       .expect(404)
//       .end(done);
//   });
// });

// describe('DELETE /todos/:id', () => {
//   it('should remove a todo', (done) => {
//     var hexId = todos[1]._id.toHexString();

//     request(app)
//       .delete(`/todos/${hexId}`)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo._id).toBe(hexId);
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }

//         Todo.findById(hexId).then((todo) => {
//           expect(todo).toNotExist();
//           done();
//         }).catch((e) => done(e));
//       });
//   });

//   it('should return 404 if todo not found', (done) => {
//     var hexId = new ObjectID().toHexString();

//     request(app)
//       .delete(`/todos/${hexId}`)
//       .expect(404)
//       .end(done);
//   });

//   it('should return 404 if object id is invalid', (done) => {
//     request(app)
//       .delete('/todos/123abc')
//       .expect(404)
//       .end(done);
//   });
// });

// describe('PATCH /todos/:id', () => {
//   it('should update the todo', (done) => {
//     var hexId = todos[0]._id.toHexString();
//     var text = 'This should be the new text';

//     request(app)
//       .patch(`/todos/${hexId}`)
//       .send({
//         completed: true,
//         text
//       })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo.text).toBe(text);
//         expect(res.body.todo.completed).toBe(true);
//         expect(res.body.todo.completedAt).toBeA('number');
//       })
//       .end(done);
//   });

//   it('should clear completedAt when todo is not completed', (done) => {
//     var hexId = todos[0]._id.toHexString();
//     var text = 'This should be the new text!!';

//     request(app)
//       .patch(`/todos/${hexId}`)
//       .send({
//         completed: false,
//         text
//       })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo.text).toBe(text);
//         expect(res.body.todo.completed).toBe(false);
//         expect(res.body.todo.completedAt).toNotExist();
//       })
//       .end(done);
//   });
// });


