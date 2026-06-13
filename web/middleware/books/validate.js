const createError = require('http-errors')
const booksSchema = require('./booksSchema')
const Joi = require('joi')
const { buildErrorMessages, invalidDateMessage } = require('../../lib/buildMessages')

module.exports = {
  post: async (req, res, next) => {
    try {
      Joi.assert(req.body, booksSchema, {stripUnknown: true, abortEarly: false})
      next()
    } catch (err) {
      if (err.details && err.details.some(d => d.type === 'customDate.invalid')) {
        next(createError(400, invalidDateMessage(req.body.published)))
      } else {
        next(createError(400, buildErrorMessages(err, 'VALIDATION_ERROR')))
      }
    }
  },

  put: async (req, res, next) => {
    try {
      Joi.assert(req.body,booksSchema, {stripUnknown: true, abortEarly: false} )
      next()
    } catch (err) {
      if (err.details && err.details.some(d => d.type === 'customDate.invalid')) {
        next(createError(400, invalidDateMessage(req.body.published)))
      } else {
        next(createError(400, buildErrorMessages(err, 'VALIDATION_ERROR')))
      }
    }
  },

  show: (req,res, next) => {
    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1)
        .messages({'number.base': 'Book_id skal være numerisk'}))
      next()
    } catch (err) {
      next(createError(400, buildErrorMessages(err,'VALIDATION_ERROR')))
    }
  },

  delete: (req,res, next) => {
    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1)
        .messages({'number.base': 'Book_id skal være numerisk'}))
      next()
    } catch (err) {
      next(createError(400, buildErrorMessages(err,'VALIDATION_ERROR')))
    }
  }
}

