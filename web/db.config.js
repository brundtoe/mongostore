/**
 * konfiguration af applikationen
 */

module.exports = {
  dbUrl: () => {
    if (process.env.PLATFORM === 'docker') {
      return process.env.DOCKER_DB_URI
    }
    if (process.env.PLATFORM === 'controller') {
      return process.env.VICTORIA_DB_URI
    }
    return process.env.KVM_URI
  },
  dbName: "bookstore-mysql",
}

