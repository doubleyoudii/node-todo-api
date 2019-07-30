require('./config/config');

//````````LIBRARIES````````````````````````````
var express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');

//```````````LOCAL MODULES```````````````````````````
//```````One Time Setup````````````````````````````````````

var ObjectID = require('mongodb').ObjectID

var {mongoose} = require('./db/mongoose');
//`````````````````````````````````````````````````````````
var {Todo} = require('./models/todos');
var {User} = require('./models/users');
var {authenticate} = require('./middleware/autenticate');


var app = express();

const port = process.env.PORT;
app.use(bodyParser.json());
//````````````````````````````````````````````````````````````````````````````

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
//````````````````````````````````````````````````````````````````````````````
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  })
});
//````````````````````````````````````````````````````````````````````````````

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send('cant Find Todo/ not exist');
    } 
    res.send({todo});
  }).catch((err) => { 
    res.status(400).send(err);
  });

});
//````````````````````````````````````````````````````````````````````````````

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((err) => {
    res.status(400).send();  
  })

});
//````````````````````````````````````````````````````````````````````````````

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
})  


//````````````**refactored** Users Post``````````````````````````````
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  var user = new User({
    email: body.email,
    password: body.password
  })

  user.save().then(() => {
    return user.generateAuthToken();
    // res.send(doc)
  }).then((token) => {
    res.header('x-auth', token).send(user);
  })
  .catch((err) => {
    res.status(400).send(err);
  })
  
});

//../middleware/autenticate cantains the file that will expain this

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
  // var token = req.header('x-auth');

  // User.findByToken(token).then((user => {
  //   if (!user) {
  //     return Promise.reject();
  //   }

  //   res.send(user);
  // }))
  // .catch((err) => {
  //   res.status(401).send();
  // })
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
 

