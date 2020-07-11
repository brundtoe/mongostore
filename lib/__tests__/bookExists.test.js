const {bookExists} = require('../bookExists')

describe("Does book exists", () => {
  test('book number 3 exists', async () => {
    const book_id = 3
    const book = await bookExists(book_id)
    expect(book).toBeTrue()
  })
  test('book number 999 does not exists', async () => {
    const book_id = 999
    const book = await bookExists(book_id)
    expect(book).toBeFalse()
  })

})
