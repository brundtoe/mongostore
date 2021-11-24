const createError = require('http-errors')
const booksSchema = require('./booksSchema')
const Joi = require('joi')
const { buildErrorMessages } = require('../../lib/buildMessages')

module.exports = {
  post: async (req, res, next) => {
    try {
      const schema = booksSchema
      Joi.assert(req.body, schema, {stripUnknown: true, abortEarly: false})
      next()
    } catch (err) {
      next(createError(400, buildErrorMessages(err,'VALIDATION_ERROR')))
    }
  },
  put: async (req, res, next) => {

    try {
      const schema = booksSchema
      Joi.assert(req.body,schema, {stripUnknown: true, abortEarly: false} )
      next()
    } catch (err) {
      next(createError(400, buildErrorMessages(err,'VALIDATION_ERROR')))
    }
  },
  show: (req,res, next) => {

    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1)
        .messages({'number.base': 'Book Id skal være numerisk'}))
      next()
    } catch (err) {
      next(createError(400, buildErrorMessages(err,'VALIDATION_ERROR')))
    }
  },
  delete: (req,res, next) => {
    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1)
        .messages({'number.base': 'Book Id skal være numerisk'}))
      next()
    } catch (err) {
      next(createError(400, buildErrorMessages(err,'VALIDATION_ERROR')))
    }
  }

}



