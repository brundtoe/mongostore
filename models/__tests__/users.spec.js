const mongoCon = require('../../dbs')
const findes = require('../../lib/userExists')
const msg = require('../../lib/messages')
const customersRepository = require('../users')

describe('Test customers model spy callThrough', () => {
  const alfredCoppel = {
    'id': 3,
    'name': 'Alfred Coppel',
    'city': 'Malibu',
    'state': 'California',
    'country': 'USA',
    'mail': 'coppel@anymail.com'
  }

  const jensAndersen = {
    'name': 'Jens Andersen',
    'city': 'Vejle',
    'state': 'Jylland',
    'country': 'DK',
    'mail': 'jens@anymail.com'
  }


  it('Should find a known customer', async () => {
    const customer = Object.assign({}, alfredCoppel)
    const actual = await customersRepository.findById(customer.id)
    expect(actual.data).toMatchObject(customer)
  })

  it('Should find a known customer', async () => {
    const customer = Object.assign({}, alfredCoppel)
    jest.spyOn(mongoCon,'getConnection')
    const actual = await customersRepository.findById(customer.id)
    expect(actual.data).toMatchObject(customer)
    expect(mongoCon.getConnection).toHaveBeenCalled()
  })

  it('Should fail to find unknown customer', () => {
    const unknown = 9999
    const expected = msg.record_not_found(unknown, 'Customer')
    jest.spyOn(mongoCon,'getConnection')

    return customersRepository.findById(unknown).then(data => {
      expect(data).toEqual(expected)
      expect(mongoCon.getConnection).toHaveBeenCalled()
    })
  })

  it('should save and then delete a known customer', async () => {
    const customer = Object.assign({}, jensAndersen)
    jest.spyOn(mongoCon,'getConnection')
    const response = await customersRepository.save(customer)
    expect(response.data.customer_id).toBeNumber()
    const customer_id = response.data.customer_id

    const actual = await customersRepository.deleteById(customer_id)
    expect(actual).toEqual(msg.record_deleted(customer_id, 'Customer'))
    expect(mongoCon.getConnection).toHaveBeenCalled()
  })

  it('Should fail to delete unknown customer', () => {
    const unknown = 9999
    const expected = msg.record_not_found(unknown, 'Customer')
    jest.spyOn(mongoCon,'getConnection')

    return customersRepository.deleteById(unknown).then(data => {
      expect(data).toEqual(expected)
      expect(mongoCon.getConnection).toHaveBeenCalled()
    })
  })

  it('Should fail to delete customer with orders', () => {
    const customer_id = 4
    const expected = msg.user_has_orders(customer_id)
    jest.spyOn(mongoCon,'getConnection')
    jest.spyOn(findes,'userHasOrders')
    return customersRepository.deleteById(customer_id).then(data => {
      expect(data).toEqual(expected)

      expect(mongoCon.getConnection).toHaveBeenCalled()
      expect(findes.userHasOrders).toHaveBeenCalledWith(customer_id)
    })
  })

  it('Should update known customer', async () => {
    const customer = Object.assign({}, jensAndersen, { id: 3 })
    jest.spyOn(mongoCon,'getConnection')
    const expected = msg.record_updated(alfredCoppel.id, 'customer')

    const response = await customersRepository.updateById(customer)
    expect(response).toEqual(expected)

    // Restore alfredCoppel
    const resp = await customersRepository.updateById(alfredCoppel)
    const alfred = msg.record_updated(alfredCoppel.id, 'customer')
    expect(response).toEqual(alfred)

    expect(mongoCon.getConnection).toHaveBeenCalled()
  })

  it('Should fail to update unknown customer', () => {
    const unknown = 9999
    const customer = Object.assign({}, jensAndersen, { id: unknown })
    jest.spyOn(mongoCon,'getConnection')
    const expected = msg.record_not_found(unknown, 'Customer')

    return customersRepository.updateById(customer).then(data => {
      expect(mongoCon.getConnection).toHaveBeenCalled()
      expect(data).toEqual(expected)
    })
  })
})
