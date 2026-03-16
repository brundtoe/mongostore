const MongoClient = require('mongodb').MongoClient
const dbConfig = require('../db.config.js')
const options = {}
let db

async function establishConnection() {
  const client = new MongoClient(dbConfig.dbUrl(), options)
  try {
    await client.connect()
    db = client.db(dbConfig.dbName)
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
  getConnection: getConnection
}
