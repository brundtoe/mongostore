const validate = require('../validate')
const Joi = require('@hapi/joi')

describe('validering af update orderlines', () => {

  test('should accept post orderline', async() => {
    const req = {
      body: {
        order_id: 11,
        book_id: 12,
        numbooks: 3
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
  })

  test('should reject post order findes ikke', async() => {
    const req = {
      body: {
        order_id: 999,
        book_id: 12,
        numbooks: 3
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0].message).toBe(`Ordren med nummer ${req.body.order_id} findes ikke`)

  })

  test('should reject post orderline', async() => {
    const req = {
      body: {
        order_id: 11,
        book_id: 59,
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
    expect(next.mock.calls[0][0]).toMatchObject({ _original: req.body })
    expect(next.mock.calls[0][0]).toContainKey('details')
    const actual = next.mock.calls[0][0].details
    expect(actual[0].message).toMatch("\"order_id\" missing required peer \"numbooks\"")
  })

  test('should accept update orderline', async() => {
    const req = {
      body: {
        order_id: 11,
        book_id: 19,
        numbooks: 3
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
  })

  test('should reject update orderline', async() => {
    const req = {
      body: {
        order_id: 23,
        book_id: 59,
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
    expect(next.mock.calls[0][0]).toMatchObject({ _original: req.body })

    expect(next.mock.calls[0][0]).toContainKey('details')
    const actual = next.mock.calls[0][0].details
    const expected = "\"order_id\" missing required peer \"numbooks\""
    expect(actual[0].message).toMatch(expected)

  })

  test('should reject update order number unknown', async () => {
    const req = {
      body: {
        order_id: 999,
        book_id: 12,
        numbooks: 3
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.put(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0].message).toBe(`Ordren med nummer ${req.body.order_id} findes ikke`)
  })

  test('should accept delete orderline', async () => {
    const req = {
      params: {
        order_id: 11,
        book_id: 12,
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.delete(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
  })

  test('should reject delete - order number unknown', async () => {
    const req = {
      params: {
        order_id: 999,
        book_id: 12,
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.delete(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0].message).toBe(`Ordren med nummer ${req.params.order_id} findes ikke`)
  })
})
