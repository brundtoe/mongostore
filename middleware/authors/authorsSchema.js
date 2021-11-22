const Joi = require('joi')

const authorsSchema = Joi.object({

  _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/,'Invalid ObjectId'),

  id: Joi.number()
    .integer()
    .min(1)
    .messages({
      'number.base': 'Author Id skal være numerisk'
    }),

  firstname: Joi.string()
    .regex(/^[a-zA-Z\sæøåÆØÅ]{2,30}$/)
    .required()
    .messages({
      'any.required': 'Feltet firstname mangler i input',
      'string.pattern.base': 'Firstname skal være  på 2 - 30 tegn'
    }),

  lastname: Joi.string()
    .regex(/^[a-zA-Z\sæøåÆØÅ]{3,30}$/)
    .required()
    .messages({
      'any.required': 'Feltet lastname mangler i input',
      'string.pattern.base': 'Lastname skal være  på 3 - 30 tegn'
    }),

  mail: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','nu'] } })
    .required()
    .messages({
      'any.required': 'Feltet mail mangler i input',
      'string.email': 'Email address er ikke rigtig'
    })
})

module.exports = authorsSchema
