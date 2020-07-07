const Joi = require('@hapi/joi')

const ordersSchema = Joi.object({
  _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),

  id: Joi.number()
    .integer()
    .min(1),

  user_id: Joi.number()
    .integer()
    .positive()
    .required(),

  orderdate: Joi.date()
    .iso()
    .greater('01-01-2012')
    .required(),

  shipdate: Joi.alternatives()
    .try(Joi.date().greater(Joi.ref('orderdate')),Joi.ref('orderdate')),

  shipby: Joi.string()
    .regex(/DHL|FedEx|Bring|PostNord|UPS|GLS/)
    .required(),

  invoicedate: Joi.alternatives()
    .try(Joi.date().greater(Joi.ref('orderdate')),Joi.ref('orderdate')),

  paydate: Joi.alternatives()
    .try(Joi.date().greater(Joi.ref('orderdate')),Joi.ref('orderdate')),

  invoice: Joi.number()
    .integer()
    .min(1),

  paymethod: Joi.string()
    .regex(/AMEX|Visa|Mastercard|PayPal/)
    .required(),

    lines: Joi.array()
    .items({
      book_id: Joi.number()
        .integer()
        .required(),


      title: Joi.string()
        .min(2)
        .max(35)
        .required(),

      salesprice: Joi.number()
        .precision(2)
        .min(1.00)
        .max(99.99)
        .required(),

      numbooks: Joi.number()
        .integer()
        .min(0)
        .max(99)
        .required()
    })
      .min(1)
      .required()

})

module.exports = ordersSchema
