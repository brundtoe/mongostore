const Joi = require('@hapi/joi')

const authorsSchema = Joi.object({
  _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/,'Invalid ObjectId'),

  id: Joi.number()
    .integer()
    .min(1),

  firstname: Joi.string()
    .regex(/^[a-zA-ZæøåÆØÅ]{3,30}$/)
    .min(2)
    .max(30)
    .required(),

  lastname: Joi.string()
    .regex(/^[a-zA-ZæøåÆØÅ]{3,30}$/)
    .min(3)
    .max(30),

  mail: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','nu'] } })
})

module.exports = authorsSchema
