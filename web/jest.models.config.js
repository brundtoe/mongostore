module.exports = {
  testEnvironment: 'node',
  testMatch:['**/models/**/*.spec.js'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/integration'],
  setupFilesAfterEnv: ["jest-extended/all"]
}
