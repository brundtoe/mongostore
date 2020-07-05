const Joi = require('@hapi/joi')

const userSchema = Joi.object({
  _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/,'Invalid ObjectId'),

  id: Joi.number()
    .integer()
    .min(1),

  name: Joi.string()
    .regex(/^[a-zA-Zæøå ÆØÅ]{3,30}$/)
    .min(3)
    .max(30)
    .required(),

  city: Joi.string()
    .regex(/^[a-zA-Zæøå ÆØÅ]{3,30}$/)
    .min(3)
    .max(30),

  state: Joi.string()
    .regex(/^[a-zA-Zæøå ÆØÅ]{3,30}$/)
    .min(0)
    .max(30),

  country: Joi.string()
    .alphanum()
    .min(0)
    .max(30),

  mail: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','nu'] } })
})

module.exports = userSchema
