//const mongoCon = require('../../../dbs')
const orderlinesController = require('../index')
//const orderData = require('./order.json')
//const newOrder = require('./newOrder.json')
//const ObjectID = require('mongodb').ObjectID
//const ordersCollection = 'bookorders'

describe('Updating orderlines on orders', () => {
  const res = {}
  const next = jest.fn()

  function cb (line, oline) {
    if (line.book_id !== oline.book_id) return false
    if (line.title !== oline.title) return false
    if (line.salesprice !== oline.salesprice) return false
    return line.numbooks === oline.numbooks

  }

  beforeEach(() => {
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Succesfully adding an orderline', async () => {
    const req = {
      body: {
        order_id: 11,
        book_id: 44,
        salesprice: 49.99,
        numbooks: 1
      }
    }

    const orderline = {
      'book_id': 44,
      'title': 'Beginning Java 2.0',
      'salesprice': 49.99,
      'numbooks': 1
    }

    await orderlinesController.save(req, res, next)
    expect(next.mock.calls.length).toBe(0)
    expect(res.status.mock.calls.length).toBe(1)
    expect(res.status.mock.calls[0][0]).toBe(201)
    expect(res.json.mock.calls.length).toBe(1)
    const actual = res.json.mock.calls[0][0].data
    expect(actual.value.id).toBe(req.body.order_id)
    const lines = actual.value.lines
    const found = lines.filter(line => cb(line, orderline))
    expect(found.length).toBeGreaterThanOrEqual(1)
  })

  test('reject adding duplicate orderline', async () => {
    const req = {
      body: {
        order_id: 11,
        book_id: 44,
        salesprice: 49.99,
        numbooks: 1
      }
    }

    await orderlinesController.save(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0].status).toBe(400)
    const expected = `Der findes allerede en ordrelinje for bog nummer ${req.body.book_id}`
    expect(next.mock.calls[0][0].message).toBe(expected)
  })

  /**
   * Depends on successfully adding an orderline
   */
  test('succesfully removing an orderline again', async () => {
    const req = {
      params: {
        order_id: 11,
        book_id: 44,
      }
    }

    await orderlinesController.delete(req, res, next)
    expect(next.mock.calls.length).toBe(0)
    expect(res.status.mock.calls.length).toBe(1)
    expect(res.status.mock.calls[0][0]).toBe(200)
    expect(res.json.mock.calls.length).toBe(1)
    const actual = res.json.mock.calls[0][0].data
    expect(actual.value.id).toBe(req.params.order_id)
    const lines = actual.value.lines
    const found = lines.filter(line => line.book_id === req.params.book_id)
    expect(found.length).toBe(0)

  })


  test('fails to remove non existing orderline', async () => {
    const req = {
      params: {
        order_id: 11,
        book_id: 999,
      }
    }

    await orderlinesController.delete(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(res.status.mock.calls.length).toBe(0)
    expect(res.json.mock.calls.length).toBe(0)
    const actual = next.mock.calls[0][0]
    expect(actual.status).toBe(400)
    expect(actual.message).toBe(`Bogen med nummer ${req.params.book_id} findes ikke`)
  })

  test('Opdater antal bøger på en ordrelinje', async () => {
    const req = {
      body: {
        order_id: 11,
        book_id: 14,
        numbooks: 5
      }
    }

    const orderline = {
      'book_id': 14,
      'title': 'Javascript Objects',
      'salesprice': 59.99,
      'numbooks': 5
    }

    await orderlinesController.update(req, res, next)
    expect(next.mock.calls.length).toBe(0)
    expect(res.status.mock.calls.length).toBe(1)
    expect(res.status.mock.calls[0][0]).toBe(201)
    expect(res.json.mock.calls.length).toBe(1)
    const lines = res.json.mock.calls[0][0].data.value.lines
    const found = lines.filter(line => cb(line, orderline))
    expect(found.length).toBe(1)

    const reset = {
      body: {
        order_id: 11,
        book_id: 14,
        numbooks: 4
      }
    }
    await orderlinesController.update(reset, res, next)

  })
})
