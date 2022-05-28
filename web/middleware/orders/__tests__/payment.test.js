const Joi = require('joi')
const ordersSchema = require('../ordersSchema')

describe('Payment og shipping', () => {

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

  describe('Payment', () => {

    test('Valid Payment methods', () => {

      const order = {
        orderdate: new Date(),
        user_id: 3,
        shipby: 'UPS',
        lines: books
      }

      const payment = new Set()
      payment.add('AMEX').add('Mastercard').add('Visa').add('PayPal')

      const schema = ordersSchema

      let valid = true

      payment.forEach((value) => {
        try {
          order.paymethod = value
          Joi.assert(order, schema)
        } catch (err) {
          valid = false
        }
      })
      expect(valid).toBeTrue()
    })
  })
  describe('Shipping', () => {

    test('Valid Shipping methods', () => {

      const order = {
        orderdate: new Date(),
        user_id: 3,
        paymethod: 'AMEX',
        lines: books
      }

      const shipby = new Set()
      shipby.add('UPS').add('DHL').add('Bring').add('FedEx').add('PostNord').add('GLS')

      const schema = ordersSchema

      let valid = true

      shipby.forEach((value) => {
        try {
          order.shipby = value
          Joi.assert(order, schema)
        } catch (err) {
          valid = false
        }
      })
      expect(valid).toBeTrue()
    })
  })
})
