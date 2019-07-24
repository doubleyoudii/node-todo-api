const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb'); //to access id


//```````````local`````````````````````````````
const {app} = require('./../server');
const {Todo} = require('./../models/todos');

const todoes = [{
  _id: new ObjectID(),            //refactored ***/
  text: "To do First test"
}, {
  _id: new ObjectID(),            //refactored ***/
  text: "To do Second Test",
  completed: true,                //refactored **/*
  completedAt: 444                //refactored **/*
}]; 

//``Fix for expecting with zero database``````
beforeEach((done) => {
  // Todo.remove({}).then(() => done());

  //`````Refactored for testing Get TODOS````
  Todo.remove({}).then(() => {
   return Todo.insertMany(todoes);
  }).then(() => done())
  .catch((e) => {
    console.log('error here');
  });
});


describe('POST /todo', () => {

  it('should create a new TODO', (done) => {
    var text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        // Todo.find().then((todos) => {
        Todo.find({text}).then((todos) => {   //refactored ****
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create a invalid todo', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          // expect(todos.length).toBe(0);
          expect(todos.length).toBe(2); //Refactored "2"    ****
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});


describe('GET /todo/:iid', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todoes[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todoes[0].text);
      })
      .end(done);

  });

  it('should return error 404 if todo not found', (done) => {
    //make sure you get 404 back
    var id = new ObjectID();
    request(app)
      .get(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if todo is not valid', (done) => {
    var id = 123;
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done)
  });
});


describe('DELETE /todo/:id', () => {

  it('should remove a todo', (done) => {
    var hexId = todoes[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.findById(hexId).then((id) => {
          expect(id).toNotExist();
          done();
        })
        .catch((e) => done(e));
      })
      
  });

  it('should return 404 if todo not found', (done) => {
    var id = new ObjectID();
    request(app)
      .delete(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object Id is not valid', (done) => {
    var id = 123;
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done)
  });

});

describe('PATCH /todos/:id', () => {

  it('should update the todo', (done) => {
    var id = todoes[0]._id.toHexString();
    var update = {
      text: 'Testing Patch',
      completed: true,
    };
    request(app)
      .patch(`/todos/${id}`)
      .send(update)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe('Testing Patch');
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done 
        // (err, res) => {
        // if (err) {
        //   return done(err);
        // }

        // Todo.findByIdAndUpdate(id).then((todo) => {
        //   expect(todo.completed).toBe(true);
        //   expect(todo.completedAt).toBeA('number');
          // done()
        // }
        
      
      );
  });

  it('should clear up completedAt when todo is not completed', (done) => { 
    var id = todoes[1]._id.toHexString();
    var text = 'Testing Patch nmber 2';

    request(app)
      .patch(`/todos/${id}`)
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
      // .catch((e) => done(e));
  });
});

