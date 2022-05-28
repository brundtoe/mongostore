jest.mock('../../../models/books')
const booksRepository = require('../../../models/books')
const booksController = require('../index')
const msg = require('../../../lib/messages')

describe('Mocking books controller', () => {

  const next = jest.fn()

  const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }


  const geeks = {
    author_id: 17,
    title: 'MongoDB for Geeks',
    published: '2020-07-02',
    bookprice: 34.49,
    isbn: '98754345',
    onhand: 11
  }

  const rust = {
    'id': 3,
    'author_id': 3,
    'title': 'Rust Programmers Reference',
    'published': '2009-03-01',
    'bookprice': 44.95,
    'isbn': '1861001576',
    'onhand': 61
  }

  it('dummy', () => {
    expect(true).toBeTrue()
  })

  it('should return a known book', async () => {
    const expected = {
      data: rust
    }

    const req = { params: { id: rust.id } }
    const res = mockResponse()
    booksRepository.findById.mockResolvedValue(expected)
    await booksController.show(req, res, next)
    expect(booksRepository.findById).toHaveBeenCalledWith(rust.id)
    expect(res.json.mock.calls[0][0]).toMatchObject(expected)
  })

  it('Should fail to find unknown book', async () => {
    const unknown = 9999
    const expected = msg.record_not_found(unknown, 'book')
    booksRepository.findById.mockResolvedValue(expected)
    const req = { params: { id: unknown } }
    const res = mockResponse()
    await booksController.show(req, res, next)
    expect(res.json).toHaveBeenCalledWith(expected)
    expect(booksRepository.findById).toHaveBeenCalledWith(unknown)
  })

  it('Should save a new book', async () => {
    const book = Object.assign({}, geeks, { id: null })
    const req = { body: book }
    const res = mockResponse()
    const expected = msg.record_created(50, 'book')
    booksRepository.save.mockResolvedValue(expected)
    await booksController.save(req, res, next)
    expect(booksRepository.save).toHaveBeenCalledWith(req.body)
    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('Should succeed to delete a known book', async () => {
    const req = { params: { id: rust.id } }
    const res = mockResponse()
    const expected = msg.record_deleted(rust.id, 'book')
    booksRepository.deleteById.mockResolvedValue(expected)
    await booksController.delete(req, res, next)
    expect(booksRepository.deleteById).toHaveBeenCalledWith(rust.id)
    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('Should fail to delete unknown book', async () => {
    const unknown = 9999
    const req = { params: { id: 9999 } }
    const res = mockResponse()
    const expected = msg.record_not_found(unknown, 'book')
    booksRepository.deleteById.mockResolvedValue(expected)

    await booksController.delete(req, res, next)
    expect(booksRepository.deleteById).toHaveBeenCalledWith(unknown)
    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('Should fail to delete book with orders', async () => {
    const req = { params: { id: rust.id } }
    const res = mockResponse()
    const expected = msg.book_has_orderlines(rust.id, 'book')
    booksRepository.deleteById.mockResolvedValue(expected)

    await booksController.delete(req, res, next)
    expect(booksRepository.deleteById).toHaveBeenCalledWith(rust.id)
    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('Should update a known book', async () => {
    const req = { body: rust }
    const res = mockResponse()
    const expected = msg.record_updated(rust.id, 'book')
    booksRepository.updateById.mockResolvedValue(expected)
    await booksController.update(req, res, next)
    expect(booksRepository.updateById).toHaveBeenCalledWith(rust)
    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('Should fail to update an unknown book', async () => {
    const unknown = 9999
    const book = Object.assign({},rust, {id: unknown})
    const req = { body: book }
    const res = mockResponse()
    const expected = msg.record_not_found(unknown, 'book')
    booksRepository.updateById.mockResolvedValue(expected)

    await booksController.update(req, res, next)
    expect(booksRepository.updateById).toHaveBeenCalledWith(book)
    expect(res.json).toHaveBeenCalledWith(expected)
  })
})
