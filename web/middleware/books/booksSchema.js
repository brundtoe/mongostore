const Joi = require('joi')

const booksSchema = Joi.object({
  _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),

  id: Joi.number()
    .integer()
    .min(1).messages({
      'number.base': 'Book_id skal være numerisk'
    }),

  author_id: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'Author_id skal være numerisk',
      'any.required': 'Feltet author_id mangler i input'
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

  //Dato firmatet valideres i funktionen lib/validateDate
  published: Joi.date()
    .greater('01-01-1994')
    .required()
    .messages({
      'date.base': 'Published skal være et datoformat',
      'date.greater': 'Published skal være efter 01-01-1994',
      'any.required': 'Feltet published mangler i input'
    }),

  bookprice: Joi.number()
    .precision(2)
    .min(1.00)
    .max(99.99)
    .required()
    .messages({
      'number.base': 'Bookprice skal være et decimaltal',
      'any.required': 'Feltet bookprice mangler i input'
    }),

  isbn: Joi.string()
    .min(1)
    .max(10)
    .required()
    .messages({
      'string.base': 'ISBN skal være en streng',
      'string.min': 'ISBN skal være mindst 1 tegn',
      'string.max': 'ISBN skal være højst 10 tegn',
      'any.required': 'Feltet isbn mangler i input'
    }),

  onhand: Joi.number()
    .integer()
    .min(0)
    .max(99)
    .required()
    .messages(
      {
        'number.base': 'Onhand skal være numerisk',
        'any.required': 'Feltet onhand mangler i input'
      })
})

module.exports = booksSchema
