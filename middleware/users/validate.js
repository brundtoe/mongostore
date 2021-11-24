const createError = require('http-errors')
const userSchema = require('./userSchema')
const Joi = require('joi')
const { buildErrorMessages } = require('../../lib/buildMessages')

module.exports = {
  post: (req, res, next) => {

    try {
      Joi.assert(req.body, userSchema, { stripUnknown: true, abortEarly: false })
      next()
    } catch (err) {
      next(createError(400, buildErrorMessages(err, 'VALIDATION_ERROR')))
    }
  },
  put: (req, res, next) => {

    try {
      Joi.assert(req.body, userSchema, { stripUnknown: true, abortEarly: false })
      next()
    } catch (err) {
      next(createError(400, buildErrorMessages(err, 'VALIDATION_ERROR')))
    }
  },
  show: (req, res, next) => {

    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1)
        .messages({ 'number.base': 'Customer Id skal være numerisk' }))
      next()
    } catch (err) {
      next(createError(400, buildErrorMessages(err, 'VALIDATION_ERROR')))
    }
  },
  delete: (req, res, next) => {
    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1)
        .messages({ 'number.base': 'Customer Id skal være numerisk' }))
      next()
    } catch (err) {
      next(createError(400, buildErrorMessages(err, 'VALIDATION_ERROR')))
    }
  }

}

