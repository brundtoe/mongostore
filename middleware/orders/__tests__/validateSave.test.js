const validate = require('../validate')
const createError = require('http-errors')
const Joi = require('@hapi/joi')

describe('Validation of orders save action', () => {

  test('should validate minimum orderinfo', () => {
    const req = {
      body: {
        orderdate: new Date(),
        user_id: 3,
        paymethod: 'AMEX',
        shipby: 'UPS'
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
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
        invoice: 3
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
        invoice: 3
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
        invoice: 3
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    validate.post(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
  })


})
