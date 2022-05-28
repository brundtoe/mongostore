/**
 * konfiguration af applikationen
 */

// eslint-disable-next-line no-undef
os = require('os')
module.exports = {
  dbUrl: () => {
    if (process.env.DOCKER) {
      return 'mongodb://mongodb:27017'
    }
    return "mongodb://localhost:27017"
  },
  dbName: "bookstore-mysql",
}
