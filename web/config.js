/**
 * konfiguration af applikationen
 */
//require('dotenv').config()
// eslint-disable-next-line no-undef
//console.log(process.env)
os = require('os')
module.exports = {
  dbUrl: () => {
    if (process.env.PLATFORM === 'docker') {
      return 'mongodb://mongodb:27017'
    }
    //return `mongodb://127.0.0.1:27017`
    return `mongodb://${process.env.DB_ADDRESS}:27017`
  },
  dbName: "bookstore-mysql",
}

