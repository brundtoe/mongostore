const Joi = require('joi')

const booksSchema = Joi.object({
  _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/,'Invalid ObjectId'),

  id: Joi.number()
    .integer()
    .min(1),

  author_id: Joi.number()
    .integer()
    .min(1)
    .required(),

  title: Joi.string()
    .min(2)
    .max(35)
    .required(),

  published: Joi.date()
    .iso()
    .greater('01-01-1994'),

  bookprice: Joi.number()
    .precision(2)
    .min(1.00)
    .max(99.99),

  isbn: Joi.string()
    .regex(/^[0-9]{10}$/)
    .length(10),

  onhand: Joi.number()
    .integer()
    .min(0)
    .max(99)

})

module.exports = booksSchema
