const mongoCon = require('../../../dbs')
const orderController = require('../index')
const orderData = require('./order.json')
const newOrder = require('./newOrder.json')
const ObjectID = require('mongodb').ObjectID
const ordersCollection = 'bookorders'

describe('Order controller', () => {

  const res = {}
  const next = jest.fn()

  async function resetOrderFive () {
    try {
      let db = await mongoCon.getConnection()
      await db.collection(ordersCollection).findOneAndReplace({ _id: orderData._id }, orderData)
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

  beforeEach( () => {
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
  })

  afterEach(() => {
    jest.clearAllMocks()
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
    await resetOrderFive()
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
        shipdate: new Date('2021-06-15'),
        paydate: new Date('2021-06-16'),
        invoicedate: new Date('2021-06-17'),
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
    expect(actual.value.invoice).toBe(3)
    expect(actual.value.paymethod).toBe('Visa')
    expect(actual.value.shipby).toBe('DHL')
    await resetOrderFive()
  })

  test('should save new order', async () => {

    const req = {
      body: newOrder
    }

    await orderController.save(req, res, next)
    expect(next.mock.calls.length).toBe(0)
    expect(res.status.mock.calls.length).toBe(1)
    expect(res.status.mock.calls[0][0]).toBe(201)
    const actual = res.json.mock.calls[0][0].data
    expect(actual.acknowledged).toBeTrue()
    expect(actual.order).toMatchObject(newOrder)
    try {
      let db = await mongoCon.getConnection()
      await db.collection(ordersCollection).findOneAndDelete({ id: actual.order.id })
    } catch (err) {
      console.log('delete af new record failed')
    }
  })

  test('should delete a order', async () => {

    const req = {
      body: newOrder
    }
    //First create new order
    await orderController.save(req, res, next)
    const actualNew = res.json.mock.calls[0][0].data
    expect(actualNew.acknowledged).toBeTrue()
    expect(actualNew.order).toMatchObject(newOrder)
    jest.clearAllMocks()
    const reqDelete = {
      params: { id: actualNew.order.id }
    }
    await orderController.delete(reqDelete, res, next)
    expect(next.mock.calls.length).toBe(0)
    expect(res.status.mock.calls.length).toBe(1)
    expect(res.status.mock.calls[0][0]).toBe(200)
    expect(res.json.mock.calls.length).toBe(1)
    const actual = res.json.mock.calls[0][0]
    expect(actual.data.value).toMatchObject(actualNew.order)
  })
})

