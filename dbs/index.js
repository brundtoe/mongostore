const MongoClient = require('mongodb').MongoClient
const config = require('../config')
const url = config.dbUrl
//const url = 'mongodb://localhost:27017'
const dbName =  config.dbName
//const dbName = 'mystore'
const options = { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 10 }

let db
let dbClient

function establishConnection () {
  MongoClient.connect(url, options)
    .then(client => {
      db = client.db(dbName)
      dbClient = client
      process.on('SIGINT', () => {
        dbClient.close();
        process.exit();
      })
    })
    .catch(error => console.error(error))
}

function getConnection () {
  return db
}

module.exports = {
  establishConnection: establishConnection,
  getConnection: getConnection
}
