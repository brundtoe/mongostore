/**
 * konfiguration af applikationen
 */

// eslint-disable-next-line no-undef
os = require('os')
module.exports = {
  dbUrl: "mongodb://localhost:27017",
  dbName: "bookstore-mysql",
  host: () => {
    // eslint-disable-next-line no-undef
    let servername = os.hostname()
    if (servername == 'komplett') {
      return 'http://localhost:3000'
    }
    if (process.env.PLATFORM == 'VAGRANT') {
      return `http://${servername}.test`
    }
    return 'http://localhost:3000'
  }
}
