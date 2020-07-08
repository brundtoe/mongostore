const {authorExists} = require('../authorExists')

describe("Does author exists", () => {
  test('author number 3 exists', async () => {
    const user_id = 3
    const author = await authorExists(user_id)
    expect(author).toBeTrue()
  })
  test('author number 999 does not exists', async () => {
    const user_id = 999
    const author = await authorExists(user_id)
    expect(author).toBeFalse()
  })

})
