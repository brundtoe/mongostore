module.exports = {
  testEnvironment: 'node',
  testMatch:['**/orderlines/**/*.spec.js', '**/orderlines/**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/integration'],
  setupFilesAfterEnv: ["jest-extended/all"]
}
require('dotenv').config()
