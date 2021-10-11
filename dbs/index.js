const MongoClient = require('mongodb').MongoClient
const config = require('../config')
const url = config.dbUrl
//const url = 'mongodb://localhost:27017'
const dbName =  config.dbName
//const dbName = 'mystore'
const options = { useNewUrlParser: true, useUnifiedTopology: true }

let db
//let dbClient

/**
function establishConnection () {
  const client = new MongoClient(url, options)

  client.connect()
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
*/
async function establishConnection() {
  const client = new MongoClient(url, options)
  try {
    await client.connect()
    db = client.db(dbName)
  } catch (err) {
    console.log(err)
  }
}


async function getConnection () {
  if (!db) {
    try {
      await establishConnection()
    } catch (err) {
      console.log(err)
    }
  }
  return db
}

module.exports = {
  establishConnection: establishConnection,
  getConnection: getConnection
}
