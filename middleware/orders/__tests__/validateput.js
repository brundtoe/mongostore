const validate = require('../validate')
const Joi = require('@hapi/joi')
describe('Validation of orders update action', () => {

  const books = [
    {
      book_id: 13,
      numbooks: 1
    },
    {
      book_id: 46,
      numbooks: 2
    }
  ]
  const orderObject = "5f0475918ea0355ffcca64a3"

  test('should validate minimum orderinfo', async () => {
    const req = {
      body: {
        _id: orderObject,
        id: 3,
        orderdate: new Date(),
        user_id: 3,
        paymethod: 'AMEX',
        shipby: 'UPS',
        lines: books
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.put(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
  })

  test('should fail without _id', async() => {
    const req = {
      body: {
        id: 3,
        user_id: 3,
        orderdate: new Date('2020-06-03'),
        paymethod: 'AMEX',
        shipby: 'UPS',
        shipdate: new Date('2020-06-03'),
        lines: books
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.put(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ _original: req.body })
    expect(next.mock.calls[0][0]).toContainKey('details')
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
    const actual = next.mock.calls[0][0].details
    const expected = "\"orderdate\" missing required peer \"_id\""
    expect(actual[0].message).toMatch(expected)
  })
  test('should fail without order line', async() => {
    const req = {
      body: {
        id: 3,
        user_id: 3,
        orderdate: new Date('2020-06-03'),
        paymethod: 'AMEX',
        shipby: 'UPS',
        shipdate: new Date('2020-06-03'),
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.put(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ _original: req.body })
    expect(next.mock.calls[0][0]).toContainKey('details')
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
    const actual = next.mock.calls[0][0].details
    const expected = "\"lines\" is required"
    expect(actual[0].message).toMatch(expected)
  })
  test('should fail without numBooks in order line', async () => {
    const req = {
      body: {
        id: 3,
        user_id: 3,
        orderdate: new Date('2020-06-03'),
        paymethod: 'AMEX',
        shipby: 'UPS',
        shipdate: new Date('2020-06-03'),
        lines: [
          {
            book_id: 123,
          },
    {
      book_id: 456,
    }
  ]
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.put(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ _original: req.body })
    expect(next.mock.calls[0][0]).toContainKey('details')
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
    const actual = next.mock.calls[0][0].details
    const expected = '"lines[0].numbooks" is required'
    expect(actual[0].message).toMatch(expected)
  })
})
