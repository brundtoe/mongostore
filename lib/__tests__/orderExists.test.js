const {orderExists} = require('../orderExists')

describe("Does order exists", () => {
  test('order number 3 exists', async () => {
    const order_id = 3
    const order = await orderExists(order_id)
    expect(order).toBeTrue()
  })
  test('order number 999 does not exists', async () => {
    const order_id = 999
    const order = await orderExists(order_id)
    expect(order).toBeFalse()
  })

})
