jest.mock('../../../models/authors')
const authorsRepository = require('../../../models/authors')
const authorsController = require('../index')
const msg = require('../../../lib/messages')

describe('Mocking authors controller', () => {

  const next = jest.fn()

  const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }

  const alex = {
    'id': 4,
    'firstname': 'Alex',
    'lastname': 'Stockton',
    'mail': 'Stockton@mail.com'
  }

  const katrine = {
    'firstname': 'Katrine',
    'lastname': 'Larsen',
    'mail': 'katrine@korsbeck.com'
  }

  it('dummy', () => {
    expect(true).toBeTrue()
  })

  it('should return a known author', async () => {
    const expected = {
      data: alex
    }

    const req = { params: { id: alex.id } }
    const res = mockResponse()
    authorsRepository.findById.mockResolvedValue(expected)
    await authorsController.show(req, res, next)
    expect(authorsRepository.findById).toHaveBeenCalledWith(alex.id)
    expect(res.json.mock.calls[0][0]).toMatchObject(expected)
  })

  it('Should fail to find unknown author', async () => {
    const unknown = 9999
    const expected = msg.record_not_found(unknown, 'Author')
    authorsRepository.findById.mockResolvedValue(expected)
    const req = { params: { id: unknown } }
    const res = mockResponse()
    await authorsController.show(req, res, next)
    expect(res.json).toHaveBeenCalledWith(expected)
    expect(authorsRepository.findById).toHaveBeenCalledWith(unknown)
  })

  it('Should save a new author', async () => {
    const author = Object.assign({}, katrine, { id: null })
    const req = { body: author }
    const res = mockResponse()
    const expected = msg.record_created(50, 'author')
    authorsRepository.save.mockResolvedValue(expected)
    await authorsController.save(req, res, next)
    expect(authorsRepository.save).toHaveBeenCalledWith(req.body)
    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('Should succeed to delete a known author', async () => {
    const req = { params: { id: alex.id } }
    const res = mockResponse()
    const expected = msg.record_deleted(alex.id, 'Author')
    authorsRepository.deleteById.mockResolvedValue(expected)
    await authorsController.delete(req, res, next)
    expect(authorsRepository.deleteById).toHaveBeenCalledWith(alex.id)
    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('Should fail to delete unknown author', async () => {
    const unknown = 9999
    const req = { params: { id: 9999 } }
    const res = mockResponse()
    const expected = msg.record_not_found(unknown, 'Author')
    authorsRepository.deleteById.mockResolvedValue(expected)

    await authorsController.delete(req, res, next)
    expect(authorsRepository.deleteById).toHaveBeenCalledWith(unknown)
    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('Should fail to delete author with books', async () => {
    const req = { params: { id: alex.id } }
    const res = mockResponse()
    const expected = msg.author_has_books(alex.id, 'Author')
    authorsRepository.deleteById.mockResolvedValue(expected)

    await authorsController.delete(req, res, next)
    expect(authorsRepository.deleteById).toHaveBeenCalledWith(alex.id)
    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('Should update a known author', async () => {
    const req = { body: alex }
    const res = mockResponse()
    const expected = msg.record_updated(alex.id, 'author')
    authorsRepository.updateById.mockResolvedValue(expected)
    await authorsController.update(req, res, next)
    expect(authorsRepository.updateById).toHaveBeenCalledWith(alex)
    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('Should fail to update an unknown author', async () => {
    const unknown = 9999
    const author = Object.assign({},alex, {id: unknown})
    const req = { body: author }
    const res = mockResponse()
    const expected = msg.record_not_found(unknown, 'Author')
    authorsRepository.updateById.mockResolvedValue(expected)

    await authorsController.update(req, res, next)
    expect(authorsRepository.updateById).toHaveBeenCalledWith(author)
    expect(res.json).toHaveBeenCalledWith(expected)
  })
})
