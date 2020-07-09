const Joi = require('@hapi/joi')

const ordersSchema = Joi.object({
  book_id: Joi.number()
    .integer()
    .min(1),

  order_id: Joi.number()
    .integer()
    .min(1),

  numbooks: Joi.number()
    .integer()
    .min(0)
    .max(99)
})

module.exports = ordersSchema
