const Joi = require('joi')

const booksSchema = Joi.object({
  _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/,'Invalid ObjectId'),

  id: Joi.number()
    .integer()
    .min(1).messages({
      'number.base': 'Book_id skal være numerisk'
    }),

  author_id: Joi.number()
    .integer()
    .min(1)
    .required().messages({
      'number.base': 'Author_id skal være numerisk'
    }),

  title: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Title må ikke være tomt',
      'any.required': 'Feltet title mangler i input',
      'string.pattern.base': 'Title skal være  på 2 - 35 tegn'
    }),

  published: Joi.date()
    .iso()
    .greater('01-01-1994'),

  bookprice: Joi.number()
    .precision(2)
    .min(1.00)
    .max(99.99),

  isbn: Joi.string()
    .min(1)
    .max(10),

  onhand: Joi.number()
    .integer()
    .min(0)
    .max(99)
    .messages(
      {'number.base': 'Onhand skal være numerisk'}
    )
})

module.exports = booksSchema
