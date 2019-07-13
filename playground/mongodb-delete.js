const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
    return console.log('Unable to connect to mongoDB server');
  }

  console.log(`connected to mongo db server`);
  const db = client.db('TodoApp')

  //delete Many`````````````````````````````````````
  // db.collection('Todos').deleteMany({text: "Eat meryenda"}).then((res) => {
  //   console.log(res);
  // })

  //delete one````````````````````````````````````````
  // db.collection('Todos').deleteOne({text: "Eat lunch"}).then((res) => {
  //   console.log(res);
  // })

  //find one and delete````````````````````````````````````
  db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
    console.log(JSON.stringify(res, undefined, 2));
  })
  
  // client.close();
});