const { isOlineValid, buildOline } = require('../orderlines')

describe('Validate orderlines', () => {

  const expected = [
    {
      'book_id': 3,
      'title': 'XML In IE5 Programmers Reference',
      'salesprice': 44.95,
      'numbooks': 2
    },
    {
      'book_id': 5,
      'title': 'Beginners Guide To Access 97',
      'salesprice': 32.99,
      'numbooks': 2
    },
    {
      'book_id': 42,
      'title': 'Beginning Java 2 - JDK 1.3 Version',
      'salesprice': 35.99,
      'numbooks': 1
    }
  ]

  test('Should validate ordelines', async () => {

    const lines = [
      {
        book_id: 3,
        numbooks: 2
      },
      {
        book_id: 5,
        numbooks: 2
      },
      {
        book_id: 42,
        numbooks: 1
      }
    ]

    const isValid = isOlineValid(lines)
    expect(isValid).toBeTrue()

    const orderlines = await buildOline(lines)
    expect(orderlines).toMatchObject(expected)

  })

  test('Should find duplicate books', async () => {

    const lines = [
      {
        book_id: 3,
        numbooks: 2
      },
      {
        book_id: 5,
        numbooks: 2
      },
      {
        book_id: 3,
        numbooks: 1
      },
      {
        book_id: 42,
        numbooks: 1
      },

    ]

    const isValid = isOlineValid(lines)
    expect(isValid).toBeFalse()
  })

  test('should fail due to unknown book', async () => {

    const lines = [
      {
        book_id: 3,
        numbooks: 2
      },
      {
        book_id: 995,
        numbooks: 2
      },
      {
        book_id: 42,
        numbooks: 1
      },
    ]

    await expect(buildOline(lines)).rejects.toThrow(`Bogen med nummer 995 findes ikke`)

  })
})
