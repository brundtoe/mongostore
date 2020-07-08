const db = require('../../../dbs')
const orderController = require('../index')
const orderData = require('./order.json')
const ObjectID = require('mongodb').ObjectID

describe('Order controller', () => {

  beforeAll( async() => {
   await db.establishConnection()
    orderData.orderdate = new Date(orderData.orderdate)
    orderData._id = ObjectID(orderData._id)
  })

  test('should return all orders', async () => {

    const req = {}
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)

    const next = jest.fn()

    await orderController.index(req,res,next)
    expect(next.mock.calls.length).toBe(0)
    expect(res.status.mock.calls.length).toBe(1)
    expect(res.status.mock.calls[0][0]).toBe(200)
    expect(res.json.mock.calls.length).toBe(1)
    expect(res.json.mock.calls[0][0].data.length).toBe(11)
  })

  test('should return all order number 5', async () => {

    const req = {
      params: {id: 5}
    }
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)

    const next = jest.fn()

    await orderController.show(req,res,next)
    //fejler grundet manglende db.connection og kalder derfor next
    expect(next.mock.calls.length).toBe(0)
    expect(res.status.mock.calls.length).toBe(1)
    expect(res.status.mock.calls[0][0]).toBe(200)
    const actual = res.json.mock.calls[0][0].data
    expect(actual.id).toBe(5)
    expect(actual).toMatchObject(orderData)

  })
})
