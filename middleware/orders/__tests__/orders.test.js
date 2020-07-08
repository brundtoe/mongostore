const mongoCon = require('../../../dbs')
const orderController = require('../index')
const orderData = require('./order.json')
const ObjectID = require('mongodb').ObjectID
describe('Order controller', () => {

  const res = {}
  const next = jest.fn()

  async function resetOrderFive () {
    try {
      let db = await mongoCon.getConnection()
      await db.collection('bookorders').findOneAndReplace({_id:orderData._id},orderData)
    } catch (err) {
      console.log(`Reset order number FIVE failed`)
      console.log(err)
    }
  }

  beforeAll(async () => {
    await resetOrderFive()
    orderData.orderdate = new Date(orderData.orderdate)
    orderData._id = ObjectID(orderData._id)
  })

  beforeEach(() => {
    res.status = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
  })

  test('should return all orders', async () => {

    const req = {}

    await orderController.index(req, res, next)
    expect(next.mock.calls.length).toBe(0)
    expect(res.status.mock.calls.length).toBe(1)
    expect(res.status.mock.calls[0][0]).toBe(200)
    expect(res.json.mock.calls.length).toBe(1)
    expect(res.json.mock.calls[0][0].data.length).toBe(11)
  })

  test('should return order number 5', async () => {

    const req = {
      params: { id: 5 }
    }

    await orderController.show(req, res, next)
    expect(next.mock.calls.length).toBe(0)
    expect(res.status.mock.calls.length).toBe(1)
    expect(res.status.mock.calls[0][0]).toBe(200)
    const actual = res.json.mock.calls[0][0].data
    expect(actual.id).toBe(5)
    expect(actual).toMatchObject(orderData)
  })
  test('should update order number 5', async () => {

    const req = {
      body: {
        id: 5,
        shipdate: new Date('2012-06-15'),
        paydate: new Date('2012-06-16'),
        invoicedate: new Date('2012-06-17'),
        invoice: 3,
        paymethod: 'Visa',
        shipby: 'DHL'
      }
    }

    await orderController.update(req, res, next)
    expect(next.mock.calls.length).toBe(0)
    expect(res.status.mock.calls.length).toBe(1)
    expect(res.status.mock.calls[0][0]).toBe(200)
    const actual = res.json.mock.calls[0][0].data
    expect(actual.value.id).toBe(5)
    expect(actual.value).toMatchObject(req.body)
    resetOrderFive()

  })
})

