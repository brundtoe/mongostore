const Joi = require('joi')

const userSchema = Joi.object({
  _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/,'Invalid ObjectId'),

  id: Joi.number()
    .integer()
    .min(1).messages({
      'number.base': 'Customer Id skal være numerisk'
    }),

  name: Joi.string()
    .regex(/^[a-zA-Zæøå ÆØÅ]{3,30}$/)
    .min(3)
    .max(30)
    .required()
    .messages({
      'any.required': 'Feltet name mangler i input',
      'string.pattern.base': 'Name skal være  på 2 - 30 tegn'
    }),

  city: Joi.string()
    .regex(/^[a-zA-Zæøå ÆØÅ]{3,30}$/)
    .min(3)
    .max(30)
    .required()
    .messages({
      'any.required': 'Feltet city mangler i input',
      'string.pattern.base': 'City skal være  på 2 - 30 tegn'
    }),

  state: Joi.string()
    .regex(/^[a-zA-Zæøå ÆØÅ]{3,30}$/)
    .min(0)
    .max(30)
    .required()
    .messages({
      'any.required': 'Feltet state mangler i input',
      'string.pattern.base': 'State skal være  på 2 - 30 tegn'
    }),

  country: Joi.string()
    .regex(/^[a-zA-Zæøå ÆØÅ]{2,30}$/)
    .min(0)
    .max(30)
    .required()
    .messages({
      'any.required': 'Feltet country mangler i input',
      'string.pattern.base': 'Country må kun indeholde bogstaver',
    }),

  mail: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','nu'] } })
    .required()
    .messages({
      'any.required': 'Feltet mail mangler i input',
      'string.email': 'Email address er ikke rigtig'
    })
})

module.exports = userSchema
