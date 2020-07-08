const validate = require('../validate')
const Joi = require('@hapi/joi')

describe('Validation of orders save action', () => {

  const books = [
    {
      book_id: 123,
      title: 'MongodDB The ultimate Guide',
      salesprice: 23.75,
      numbooks: 1
    },
    {
      book_id: 456,
      title: 'Node.js The ultimate Guide',
      salesprice: 38.99,
      numbooks: 2
    }
  ]

  test('should validate payment orderinfo', () => {
    const req = {
      body: {
        orderdate: new Date(),
        user_id: 3,
        shipby: 'UPS',
        lines: books
      }
    }
    const payment = new Set()
    payment.add('AMEX').add('Mastercard').add('Visa').add('PayPal')

    const res = jest.fn()
    const next = jest.fn()
    payment.forEach((value) => {
      req.body.paymethod = value
      validate.post(req, res, next)
      expect(next.mock.calls.length).toBe(1)
      expect(next.mock.calls[0][0]).toBe(undefined)
      next.mockClear()
    })
  })

  test('should validate shiby orderinfo', () => {
    const req = {
      body: {
        orderdate: new Date(),
        user_id: 3,
        paymethod: 'AMEX',
        lines: books
      }
    }
    const shipby = new Set()
    shipby.add('UPS').add('DHL').add('Bring').add('FedEx').add('PostNord').add('GLS')

    const res = jest.fn()
    const next = jest.fn()
    shipby.forEach((value) => {
      req.body.shipby = value
      validate.post(req, res, next)
      expect(next.mock.calls.length).toBe(1)
      expect(next.mock.calls[0][0]).toBe(undefined)
      next.mockClear()
    })
  })

  test('should validate alle fields in orderinfo', () => {
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
    validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
  })

  test('should validate alle dates are equal', () => {
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
    validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
  })

  test('should validate alle dates are greatere than orderdate', () => {
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
    validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
  })

  test('should validate order line', () => {
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
    validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
  })

  test('should fail shipdate less than orderdate', () => {
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
    const expected = /"message":"\\"shipdate\\" must be greater than \\"ref:orderdate\\""/
    validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ _original: req.body })
    expect(next.mock.calls[0][0]).toContainKey('details')
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
    const actual = JSON.stringify(next.mock.calls[0][0])
    expect(actual).toMatch(expected)
  })

  test('should fail paydate less than orderdate', () => {
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
    const expected = /"message":"\\"paydate\\" must be greater than \\"ref:orderdate\\""/
    validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ _original: req.body })
    expect(next.mock.calls[0][0]).toContainKey('details')
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
    const actual = JSON.stringify(next.mock.calls[0][0])
    expect(actual).toMatch(expected)
  })
  test('should fail invoicedate less than orderdate', () => {
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
    const expected = /"message":"\\"invoicedate\\" must be greater than \\"ref:orderdate\\""/
    validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ _original: req.body })
    expect(next.mock.calls[0][0]).toContainKey('details')
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
    const actual = JSON.stringify(next.mock.calls[0][0])
    expect(actual).toMatch(expected)
  })

})
