const validate = require('../validate')
const Joi = require('@hapi/joi')

describe('Validation of orders save action', () => {

  const books = [
    {
      book_id: 123,
      numbooks: 1
    },
    {
      book_id: 456,
      numbooks: 2
    }
  ]

  test('should validate alle fields in orderinfo', async () => {
    const req = {
      body: {
        user_id: 3,
        orderdate: new Date('2020-06-03'),
        paymethod: 'AMEX',
        shipby: 'UPS',
        shipdate: new Date('2020-06-12'),
        invoicedate: new Date('2020-06-12'),
        paydate: new Date('2020-06-21'),
        invoice: 3,
        lines: books
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
  })

  test('should validate alle dates are equal', async () => {
    const req = {
      body: {
        user_id: 3,
        orderdate: new Date('2020-06-03'),
        paymethod: 'AMEX',
        shipby: 'UPS',
        shipdate: new Date('2020-06-03'),
        invoicedate: new Date('2020-06-03'),
        paydate: new Date('2020-06-03'),
        invoice: 3,
        lines: books
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
  })

  test('should validate alle dates are greatere than orderdate', async () => {
    const req = {
      body: {
        user_id: 3,
        orderdate: new Date('2020-06-03'),
        paymethod: 'AMEX',
        shipby: 'UPS',
        shipdate: new Date('2020-06-04'),
        invoicedate: new Date('2020-06-05'),
        paydate: new Date('2020-06-06'),
        invoice: 3,
        lines: books
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
  })

  test('should validate order line', async () => {
    const req = {
      body: {
        user_id: 3,
        orderdate: new Date('2020-06-03'),
        paymethod: 'AMEX',
        shipby: 'UPS',
        lines: books
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
  })

  test('Should fail user eksister ikke', async () => {
    const req = {
      body: {
        user_id: 999,
        orderdate: new Date('2020-06-03'),
        paymethod: 'AMEX',
        shipby: 'UPS',
        lines: books
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0].message).toBe('user does not exist')
    expect(next.mock.calls[0][0].status).toBe(400)
  })


  test('should fail shipdate less than orderdate', async () => {
    const req = {
      body: {
        user_id: 3,
        orderdate: new Date('2020-06-03'),
        paymethod: 'AMEX',
        shipby: 'UPS',
        shipdate: new Date('2020-06-01'),
        lines: books
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ _original: req.body })
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
    expect(next.mock.calls[0][0]).toContainKey('details')
    const actual = next.mock.calls[0][0].details
    const expected = '"shipdate" must be greater than "ref:orderdate"'
    expect(actual[0].message).toMatch(expected)
  })

  test('should fail paydate less than orderdate', async () => {
    const req = {
      body: {
        user_id: 3,
        orderdate: new Date('2020-06-03'),
        paymethod: 'AMEX',
        shipby: 'UPS',
        paydate: new Date('2020-06-01'),
        lines: books
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ _original: req.body })
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
    expect(next.mock.calls[0][0]).toContainKey('details')
    const actual = next.mock.calls[0][0].details
    const expected = '"paydate" must be greater than "ref:orderdate"'
    expect(actual[0].message).toMatch(expected)
  })
  test('should fail invoicedate less than orderdate', async () => {
    const req = {
      body: {
        user_id: 3,
        orderdate: new Date('2020-06-03'),
        paymethod: 'AMEX',
        shipby: 'UPS',
        invoicedate: new Date('2020-06-01'),
        lines: books
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ _original: req.body })
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
    expect(next.mock.calls[0][0]).toContainKey('details')
    const actual = next.mock.calls[0][0].details
    const expected = '"invoicedate" must be greater than "ref:orderdate"'
    expect(actual[0].message).toMatch(expected)
  })

})
