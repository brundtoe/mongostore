module.exports = {
  testEnvironment: 'node',
  testMatch:['**/middleware/**/*.spec.js'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/integration'],
  setupFilesAfterEnv: ["jest-extended/all"]
}
require('dotenv').config()
