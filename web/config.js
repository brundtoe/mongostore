/**
 * konfiguration af applikationen
 */

// eslint-disable-next-line no-undef
os = require('os')
module.exports = {
  dbUrl: () => {
    if (process.env.PLATFORM == 'docker') {
      return 'mongodb://mongodb:27017'
    }
    return `mongodb://${process.env.VGSERVER}:27017`
  },
  dbName: "bookstore-mysql",
}
