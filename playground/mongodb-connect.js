const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
    return console.log('Unable to connect to mongoDB server');
  }

  console.log(`connected to mongo db server`);
  const db = client.db('TodoApp')

  // db.collection('Todos').insertOne({
  //   text: 'Something To do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert To do', err)
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // });

  db.collection('Users').insertOne({
    Name: 'William',
    Age: 21,
    Location: 'General Trias, Cavite',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert To do', err)
    }
    console.log(JSON.stringify(result.ops, undefined, 2))
  });

  client.close();
});