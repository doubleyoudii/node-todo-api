//````````LIBRARIES````````````````````````````
var express = require('express');
var bodyParser = require('body-parser');


//```````````LOCAL MODULES```````````````````````````
//```````One Time Setup````````````````````````````````````
var {mongoose} = require('./db/mongoose');
//`````````````````````````````````````````````````````````
var {Todo} = require('./models/todos');
var {User} = require('./models/users');


var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  })
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  })
});

app.listen(3000, () => {
  console.log('Started on Port 3000');
});

module.exports = {app};


