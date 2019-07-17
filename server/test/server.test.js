const expect = require('expect');
const request = require('supertest');


//```````````local`````````````````````````````
const {app} = require('./../server');
const {Todo} = require('./../models/todos');

const todoes = [{
  text: "To do First test"
}, {
  text: "To do Second Test"
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
        Todo.find({text}).then((todos) => {   //refactored */*
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      })
  })

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
          expect(todos.length).toBe(2); //Refactored "2"    */*
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
  })
})




