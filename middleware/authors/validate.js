const createError = require('http-errors')
const authorsSchema = require('./authorsSchema')
const { buildErrorMessages } = require('../../lib/buildMessages')
const Joi = require('joi')

module.exports = {
  post: (req, res, next) => {

    try {
      Joi.assert(req.body, authorsSchema, { stripUnknown: true })
      next()
    } catch (err) {
      next(createError(400, buildErrorMessages(err, 'VALIDATION_ERROR')))
    }
  },
  put: (req, res, next) => {

    try {
      Joi.assert(req.body, authorsSchema, { stripUnknown: true })
      next()
    } catch (err) {
      next(createError(400, buildErrorMessages(err, 'VALIDATION_ERROR')))
    }
  },
  show: (req, res, next) => {

    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1)
        .messages({ 'number.base': 'Author Id skal være numerisk' }))
      next()
    } catch (err) {
      next(createError(400, buildErrorMessages(err, 'VALIDATION_ERROR')))
    }
  },
  delete: (req, res, next) => {
    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1)
        .messages({ 'number.base': 'Author Id skal være numerisk' }))
      next()
    } catch (err) {
      next(createError(400, buildErrorMessages(err, 'VALIDATION_ERROR')))
    }
  }

}

