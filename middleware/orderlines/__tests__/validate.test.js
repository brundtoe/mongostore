const validate = require('../validate')
const Joi = require('@hapi/joi')

describe('validering af update orderlines', () => {

  test('should accept post orderline', () => {
    const req = {
      body: {
        order_id: 23,
        book_id: 59,
        numbooks: 3
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
  })

  test('should reject post orderline', () => {
    const req = {
      body: {
        order_id: 23,
        book_id: 59,
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
    expect(next.mock.calls[0][0]).toMatchObject({ _original: req.body })
    expect(next.mock.calls[0][0]).toContainKey('details')
    const actual = next.mock.calls[0][0].details
    expect(actual[0].message).toMatch("\"order_id\" missing required peer \"numbooks\"")
  })

  test('should accept update orderline', () => {
    const req = {
      body: {
        order_id: 23,
        book_id: 59,
        numbooks: 3
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
  })

  test('should reject update orderline', () => {
    const req = {
      body: {
        order_id: 23,
        book_id: 59,
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
    expect(next.mock.calls[0][0]).toMatchObject({ _original: req.body })

    expect(next.mock.calls[0][0]).toContainKey('details')
    const actual = next.mock.calls[0][0].details
    const expected = "\"order_id\" missing required peer \"numbooks\""
    expect(actual[0].message).toMatch(expected)

  })

})
