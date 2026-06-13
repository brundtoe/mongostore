const Joi = require('joi')
const { isDateValid } = require('../../lib/validateDate')

const customJoi = Joi.extend((joi) => ({
  type: 'customDate',
  base: joi.string(),
  messages: {
    'customDate.invalid': 'Date {{#label}}: {{#value}} er ikke en gyldig dato'
  },
  validate (value, helpers) {
    if (!isDateValid(value)) {
      return { value, errors: helpers.error('customDate.invalid', { value }) }
    }
  }
}))

const booksSchema = customJoi.object({

  id: customJoi.number()
    .integer()
    .min(1).messages({
      'number.base': 'Book_id skal være numerisk'
    }),

  author_id: customJoi.number()
    .integer()
    .min(1)
    .required().messages({
      'number.base': 'Author_id skal være numerisk',
      'any.required': 'Feltet author_id mangler i input'
    }),

  title: customJoi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Title må ikke være tomt',
      'any.required': 'Feltet title mangler i input',
      'string.pattern.base': 'Title skal være  på 2 - 35 tegn'
    }),

  // Dato valideres nu direkte via customDate
  published: customJoi.customDate()
    .required()
    .messages({
      'any.required': 'Feltet published mangler i input'
    }),

  bookprice: customJoi.number()
    .precision(2)
    .min(1.00)
    .max(99.99)
    .required()
    .messages({
      'number.base': 'Bookprice skal være et decimaltal',
      'any.required': 'Feltet bookprice mangler i input'
    }),

  isbn: customJoi.string()
    .min(1)
    .max(10)
    .required()
    .messages({
      'string.base': 'ISBN skal være en streng',
      'any.required': 'Feltet isbn mangler i input'
    }),

  onhand: customJoi.number()
    .integer()
    .min(0)
    .max(99)
    .required()
    .messages(
      {
        'number.base': 'Onhand skal være numerisk',
        'any.required': 'Feltet onhand mangler i input'
      }
    )
})

module.exports = booksSchema
