const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
    return console.log('Unable to connect to mongoDB server');
  }

  console.log(`connected to mongo db server`);
  const db = client.db('TodoApp')

//`````````This will throw a strigify array``````````````````````
  // db.collection('Todos').find().toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // })


  //````````````this will search for the provided id````````````
  // db.collection('Todos').find({
  //   _id: new ObjectID('5d26c1d0e717cca4ce042159')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos');
  // })


  //````This will return the count of the DB`````````````````````
  // db.collection('Todos').find().count().then((count) => {
  //   console.log('Todos');
  //   console.log(`Todo's count is ${count}`)
  // }, (err) => {
  //   console.log('Unable to fetch TODOS');
  // })

  //challenge~~~~Find all the users named William
  db.collection('Users').find({
    Name: "William"
  }).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  })

  // client.close();
});