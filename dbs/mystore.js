const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'mystore'
const options = { useNewUrlParser: true, useUnifiedTopology: true }

let db
let dbClient

function connect(url,options, dbName){
  return MongoClient.connect(url,options).then(client =>  client.db(dbName))
}

module.exports = async function () {
  db = await connect(url,options, dbName)
  process.on('SIGINT', () => {
    dbClient.close();
    process.exit();
  });
  return db
}
