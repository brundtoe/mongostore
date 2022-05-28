const mongoCon = require('../../dbs')
const findes = require('../../lib/authorExists')
const msg = require('../../lib/messages')
const authorsRepository = require('../authors')

describe('Test authors model spy callThrough', () => {

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

  it('Should find known author', async () => {
    const author = Object.assign({}, alex)
    const actual = await authorsRepository.findById(author.id)
    expect(actual.data).toMatchObject(author)
  })

  it('Should spyOn find known author', async () => {
    const author = Object.assign({}, alex)
    jest.spyOn(mongoCon, 'getConnection')
    const actual = await authorsRepository.findById(author.id)
    expect(actual.data).toMatchObject(author)
    expect(mongoCon.getConnection).toHaveBeenCalled()
  })

  it('Should fail to find unknown author', async () => {
    const unknown = 9999
    const expected = msg.record_not_found(unknown, 'Author')
    jest.spyOn(msg, 'record_not_found')
    const actual = await authorsRepository.findById(unknown)
    expect(actual).toEqual(expected)
    expect(msg.record_not_found).toHaveBeenCalled()
  })

  it('should save and then delete a known author', async () => {

    const author = Object.assign({}, katrine)
    jest.spyOn(msg, 'record_created')

    const response = await authorsRepository.save(author)
    expect(response.data.author_id).toBeNumber()
    const author_id = response.data.author_id
    expect(msg.record_created).toHaveBeenCalledWith(author_id,'author')
    const actual = await authorsRepository.deleteById(author_id)
    expect(actual).toEqual(msg.record_deleted(author_id, 'Author'))
  })

  it('Should fail to delete unknown author', () => {
    const unknown = 9999
    const expected = msg.record_not_found(unknown, 'Author')
    jest.spyOn(mongoCon, 'getConnection')
    return authorsRepository.findById(unknown).then(data => {
      expect(data).toEqual(expected)
      expect(mongoCon.getConnection).toHaveBeenCalled()
    })
  })

  it('Should fail to delete author with books written', () => {
    const author_id = 4
    const expected = msg.author_has_books(author_id)
    jest.spyOn(mongoCon, 'getConnection')
    jest.spyOn(findes,'hasBooksWritten')

    return authorsRepository.deleteById(author_id).then(data => {
      expect(data).toEqual(expected)
      expect(mongoCon.getConnection).toHaveBeenCalled()
      expect(findes.hasBooksWritten).toHaveBeenCalledWith(author_id)
    })
  })

  it('Should update known author', async () => {
    const author = Object.assign({}, katrine, { id: alex.id })
    jest.spyOn(mongoCon, 'getConnection')
    const expected = msg.record_updated(alex.id, 'author')

    const response = await authorsRepository.updateById(author)
    expect(response).toEqual(expected)

    // Restore Alex
    const resp = await authorsRepository.updateById(alex)
    expect(response).toEqual(expected)
  })

  it('Should fail to update unknown author', () => {
    const unknown = 9999
    const author = Object.assign({}, alex, { id: unknown })
    jest.spyOn(mongoCon, 'getConnection')
    const expected = msg.record_not_found(unknown, 'Author')

    return authorsRepository.updateById(author).then(data => {
      expect(mongoCon.getConnection).toHaveBeenCalled()
      expect(data).toEqual(expected)
    })
  })
})
