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

  shipdate: Joi.date()
    .iso()
    .greater('01-01-2012'),

  invoicedate: Joi.date()
    .iso()
    .greater('01-01-2012'),

  paydate: Joi.date()
    .iso()
    .greater('01-01-2012'),

  invoice: Joi.number()
    .integer()
    .min(1),

  paymethod: Joi.string()
    .min(2)
    .max(35)
    .required()

})

module.exports = ordersSchema
