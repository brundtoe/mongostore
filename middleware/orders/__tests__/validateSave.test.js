const validate = require('../validate')
const createError = require('http-errors')
const Joi = require('@hapi/joi')

describe('Validation of orders save action', () => {

  test('should validate minimum orderinfo', () => {
    const req = {
      body: {
        orderdate: new Date(),
        user_id: 3,
        paymethod: 'AMEX'
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
  })
})
