const mongoCon = require('../../dbs')
const findesBook = require('../../lib/bookExists')
const findesAuthor = require('../../lib/authorExists')
const msg = require('../../lib/messages')
const booksRepository = require('../books')

describe('Test books model spy callThrough', () => {

  const wordBasic = {
    'id': 6,
    'author_id': 7,
    'title': 'Beginning WordBasic Programming',
    'published': '2009-07-01',
    'bookprice': 39.95,
    'isbn': '1874416869',
    'onhand': 23
  }

  const rust = {
    'author_id': 3,
    'title': 'Professional Rust',
    'published': '2021-04-01',
    'bookprice': 73.08,
    'isbn': '1861004885',
    'onhand': 45
  }

  it('Should find a known book', async () => {
    const book = Object.assign({}, wordBasic)
    const actual = await booksRepository.findById(book.id)
    const bookFound = Object.assign({}, actual.data)
    expect(bookFound).toMatchObject(book)
  })

  it('Should spyOn and find a known book', async () => {
    const book = Object.assign({}, wordBasic)
    jest.spyOn(mongoCon,'getConnection')
    const actual = await booksRepository.findById(book.id)
    const bookFound = Object.assign({}, actual.data)
    expect(bookFound).toMatchObject(book)
    expect(mongoCon.getConnection).toHaveBeenCalled()
  })

  it('Should fail to find unknown book', () => {
    const unknown = 9999
    const expected = msg.record_not_found(unknown, 'Book')
    jest.spyOn(mongoCon,'getConnection')

    return booksRepository.deleteById(unknown).then(data => {
      expect(data).toEqual(expected)
      expect(mongoCon.getConnection).toHaveBeenCalled()
    })
  })

  it('should save and then delete a known book', async () => {

    const book = Object.assign({}, rust)
    jest.spyOn(mongoCon,'getConnection')
    const response = await booksRepository.save(book)
    expect(response.data.book_id).toBeNumber()
    const book_id = response.data.book_id

    const actual = await booksRepository.deleteById(book_id)
    expect(actual).toEqual(msg.record_deleted(book_id, 'Book'))
    expect(mongoCon.getConnection).toHaveBeenCalled()
  })

  it('Should fail to save book with unknown author', async () => {

    const unknown = 9999
    const book = Object.assign({}, rust, { author_id: unknown })
    jest.spyOn(mongoCon,'getConnection')
    const data = await booksRepository.save(book)
    expect(data).toEqual(msg.record_not_found(unknown, 'Author'))
    expect(mongoCon.getConnection).toHaveBeenCalled()
  })

  it('Should fail to delete unknown book', async () => {

    const unknown = 9999
    jest.spyOn(mongoCon,'getConnection')
    const data = await booksRepository.deleteById(unknown)
    expect(data).toEqual(msg.record_not_found(unknown, 'Book'))
    expect(mongoCon.getConnection).toHaveBeenCalled()
  })

  it('Should fail to delete book with orders', async () => {

    const book_id = 7
    jest.spyOn(mongoCon,'getConnection')
    jest.spyOn(findesBook,'hasOrderlines')
    const data = await booksRepository.deleteById(book_id)
    expect(data).toEqual(msg.book_has_orderlines(book_id))
    expect(mongoCon.getConnection).toHaveBeenCalled()
    expect(findesBook.hasOrderlines).toHaveBeenCalledWith(book_id)
  })

  it('Should update a known book', async () => {
    const book = Object.assign({}, rust, { id: wordBasic.id })
    jest.spyOn(mongoCon,'getConnection')
    jest.spyOn(findesAuthor,'authorExists')
    const expected = msg.record_updated(wordBasic.id, 'book')

    const response = await booksRepository.updateById(book)
    expect(response).toEqual(expected)

    // restore original content
    const resp = await booksRepository.updateById(wordBasic)
    expect(resp).toEqual(expected)
    expect(mongoCon.getConnection).toHaveBeenCalled()
    expect(findesAuthor.authorExists).toHaveBeenCalledWith(book.author_id)
  })

  it('Should fail to update an unknown book', async () => {
    const unknown = 9999

    const book = Object.assign({}, wordBasic, { id: unknown })
    jest.spyOn(mongoCon,'getConnection')
    const expected = msg.record_not_found(unknown, 'Book')

    const response = await booksRepository.updateById(book)
    expect(response).toEqual(expected)
    expect(mongoCon.getConnection).toHaveBeenCalled()
  })

  it('Should fail to update a book with unknown author', async () => {
    const unknown = 9999
    const book = Object.assign({}, wordBasic, { author_id: unknown })
    const expected = msg.record_not_found(unknown, 'Author')
    jest.spyOn(mongoCon,'getConnection')
    jest.spyOn(findesAuthor,'authorExists')

    const response = await booksRepository.updateById(book)
    expect(response).toEqual(expected)
    expect(findesAuthor.authorExists).toHaveBeenCalledWith(book.author_id)
    expect(mongoCon.getConnection).toHaveBeenCalled()

  })
})
