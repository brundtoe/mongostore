const mongoCon = require('../../../dbs')
const orderController = require('../index')
const orderData = require('./order.json')
const newOrder = require('./newOrder.json')
const ObjectId = require('mongodb').ObjectId
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
    // ordreData.orderdate og orderData._id fra json filen er strings
    // test mod indlæste data kræver et Dato objekt og en Object._id
    // øvrige datofelter har ingen værdi derfor omformes de ikke til dato objekter
    orderData.orderdate = new Date(orderData.orderdate)
    orderData._id = new ObjectId(orderData._id)
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
    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledTimes(1)
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
    expect(actual.id).toBe(5)
    expect(actual.invoice).toBe(3)
    expect(actual.paymethod).toBe('Visa')
    expect(actual.shipby).toBe('DHL')
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
      console.log('delete af new record failed', err)
    }
  })

  test('should delete an order', async () => {

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
    expect(actual.data).toMatchObject(actualNew.order)
  })
})

