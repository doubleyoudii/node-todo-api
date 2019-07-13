const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
    return console.log('Unable to connect to mongoDB server');
  }

  console.log(`connected to mongo db server`);
  const db = client.db('TodoApp')

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5d26c1d0e717cca4ce042159')
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log(res);
  });
  
  // client.close();
});