module.exports = {
  testEnvironment: 'node',
  testMatch:['**/middleware/**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/integration'],
  setupFilesAfterEnv: ["jest-extended/all"]
}
