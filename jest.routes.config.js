module.exports = {
  testEnvironment: 'node',
  testMatch:['**/routes/**/*.spec.js'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/integration'],
  setupFilesAfterEnv: ["jest-extended/all"]
}
