jest.mock('../../../models/users')
const customersRepository = require('../../../models/users')
const customersController = require('../index')
const msg = require('../../../lib/messages')

describe('Mocking customers controller', () => {

  const next = jest.fn()

  const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }

  const maria = {
    name: 'Maria Johansen',
    city: 'Smørum',
    state: 'Hovedstaden',
    country: 'DK',
    mail: 'maria@example.com'
  }
  const alfred = {
    "id": 3,
    "name": "Alfred Coppel",
    "city": "Malibu",
    "state": "California",
    "country": "USA",
    "mail": "coppel@anymail.com"
  }

  it('dummy', () => {
    expect(true).toBeTrue()
  })

  it('should return a known customer', async () => {
    const expected = {
      data: alfred
    }

    const req = { params: { id: alfred.id } }
    const res = mockResponse()
    customersRepository.findById.mockResolvedValue(expected)
    await customersController.show(req, res, next)
    expect(customersRepository.findById).toHaveBeenCalledWith(alfred.id)
    expect(res.json.mock.calls[0][0]).toMatchObject(expected)
  })

  it('Should fail to find unknown customer', async () => {
    const unknown = 9999
    const expected = msg.record_not_found(unknown, 'customer')
    customersRepository.findById.mockResolvedValue(expected)
    const req = { params: { id: unknown } }
    const res = mockResponse()
    await customersController.show(req, res, next)
    expect(res.json).toHaveBeenCalledWith(expected)
    expect(customersRepository.findById).toHaveBeenCalledWith(unknown)
  })

  it('Should save a new customer', async () => {
    const customer = Object.assign({}, maria, { id: null })
    const req = { body: customer }
    const res = mockResponse()
    const expected = msg.record_created(50, 'customer')
    customersRepository.save.mockResolvedValue(expected)
    await customersController.save(req, res, next)
    expect(customersRepository.save).toHaveBeenCalledWith(req.body)
    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('Should succeed to delete a known customer', async () => {
    const req = { params: { id: alfred.id } }
    const res = mockResponse()
    const expected = msg.record_deleted(alfred.id, 'customer')
    customersRepository.deleteById.mockResolvedValue(expected)
    await customersController.delete(req, res, next)
    expect(customersRepository.deleteById).toHaveBeenCalledWith(alfred.id)
    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('Should fail to delete unknown customer', async () => {
    const unknown = 9999
    const req = { params: { id: 9999 } }
    const res = mockResponse()
    const expected = msg.record_not_found(unknown, 'customer')
    customersRepository.deleteById.mockResolvedValue(expected)

    await customersController.delete(req, res, next)
    expect(customersRepository.deleteById).toHaveBeenCalledWith(unknown)
    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('Should fail to delete customer with orders', async () => {
    const req = { params: { id: alfred.id } }
    const res = mockResponse()
    const expected = msg.user_has_orders(alfred.id, 'customer')
    customersRepository.deleteById.mockResolvedValue(expected)

    await customersController.delete(req, res, next)
    expect(customersRepository.deleteById).toHaveBeenCalledWith(alfred.id)
    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('Should update a known customer', async () => {
    const req = { body: alfred }
    const res = mockResponse()
    const expected = msg.record_updated(alfred.id, 'customer')
    customersRepository.updateById.mockResolvedValue(expected)
    await customersController.update(req, res, next)
    expect(customersRepository.updateById).toHaveBeenCalledWith(alfred)
    expect(res.json).toHaveBeenCalledWith(expected)
  })

  it('Should fail to update an unknown customer', async () => {
    const unknown = 9999
    const customer = Object.assign({},alfred, {id: unknown})
    const req = { body: customer }
    const res = mockResponse()
    const expected = msg.record_not_found(unknown, 'customer')
    customersRepository.updateById.mockResolvedValue(expected)

    await customersController.update(req, res, next)
    expect(customersRepository.updateById).toHaveBeenCalledWith(customer)
    expect(res.json).toHaveBeenCalledWith(expected)
  })
})
