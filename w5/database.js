require('dotenv').config()

let MongoClient = require('mongodb').MongoClient

// let username = process.env.DB_USER
// let password = process.env.DB_PASS
let dbhost = process.env.DB_HOST_PORT
let database = process.env.DB_NAME

let url = `mongodb://${dbhost}/${database}`

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect(function(err) {
  if (err) {
      console.error('Error', err)
  } else {
    const db = client.db(database);
    console.log("Connected successfully to server");
    const collection = db.collection('users');
    const data = [
      {
        fullname: 'nguyen a',
        username: 'anguyen',
        password: 'abc',
      }
    ];
    insertUsers(collection, data, function() {
    });
  }

// document sample: https://mongodb.github.io/node-mongodb-native/3.4/quick-start/quick-start/
  // update at least 1 users
  // delete a user
  // find a user with fullname contain 'Thi'
  client.close()
})

const insertUsers = function(collection, data, callback) {
    collection.insertMany(data, function(err, result) {
      console.log("Inserted 3 users into the collection");
      callback(result);
    });
}
const updateUsers = function(collection, callback) {
  collection.updateOne(
    { username : 'athino' },
    { $set: { fullName : 'nguyen thi A' } }, function(err, result) {
        console.log("Updated the users with the field username equal to anthino");
        callback(result);
  });  
}
const removeUsers = function(collection, callback) {
  collection.deleteOne({ fullName : 'C Thi No' }, function(err, result) {
    console.log("Removed the document with the field username equal to anthino");
    callback(result);
  });    
}
  
const findUsers = function(db, callback) {
  collection.find({fullName: { $regex: /^A/ }}).toArray(function(err, docs) {
    console.log("Found the following records", err);
    console.log(docs);
    callback(docs);
  });
} 
  