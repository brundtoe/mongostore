const db = require('../../../dbs')
const orderController = require('../index')

describe('Order controller', () => {

  beforeAll( async() => {
   await db.establishConnection()
  })

  test('should return all orders', async () => {

    const req = jest.fn()
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)

    const next = jest.fn()

    await orderController.index(req,res,next)
    //fejler grundet manglende db.connection og kalder derfor next
    expect(next.mock.calls.length).toBe(0)
    expect(res.status.mock.calls.length).toBe(1)
    expect(res.json.mock.calls.length).toBe(1)

  })

})
