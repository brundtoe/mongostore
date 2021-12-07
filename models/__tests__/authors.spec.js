const mongoCon = require('../../dbs')
//const { getNextId } = require('../lib/getNextId')
//const findes = require('../lib/authorExists')
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
})
