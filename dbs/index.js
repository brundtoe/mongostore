const MongoClient = require('mongodb').MongoClient
const url = process.env.DB_URL
//const url = 'mongodb://localhost:27017'
const dbName =  process.env.DB_NAME
//const dbName = 'mystore'
const options = { useNewUrlParser: true, useUnifiedTopology: true }

let db
let dbClient

function establishConnection () {
  MongoClient.connect(url, options)
    .then(client => {
      db = client.db(dbName)
      dbClient = client
    })
    .catch(error => console.error(error))
}

function getConnection () {

   if (db !== null) {
    return db
  }
   establishConnection()

  return db
}

module.exports = {
  establishConnection: establishConnection,
  getConnection: getConnection
}
