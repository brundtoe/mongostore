const mongoCon = require('../../dbs')
const createError = require('http-errors')
const {getNextId} = require('../../lib/getNextId')
const booksCollection = 'books'

module.exports = {
  async index (req, res, next) {
    try {
      let db = mongoCon.getConnection()
      res.status(200).json({ data: { success: 'bookorders index' } })
    } catch (err) {
      next(createError(400, err.message))
    }
  },

  async show (req, res, next) {
    const order_id = parseInt(req.params.id)
    try {
      let db = mongoCon.getConnection()
      res.status(200).json({ data: { success: 'bookorders show' } })
    } catch (err) {
      next(createError(400, err.message))
    }
  },
  async save (req, res, next) {
    try {
      let db = mongoCon.getConnection()
      res.status(200).json({ data: { success: 'bookorders save' } })
    } catch (err) {
      next(createError(400, err.message))
    }
  },
  async update (req, res, next) {
    const order_id = parseInt(req.params.id)
    try {
      let db = mongoCon.getConnection()
      res.status(200).json({ data: { success: 'bookorders update' } })
    } catch (err) {
      next(createError(400, err.message))
    }
  },
  async delete (req, res, next) {
    const order_id = parseInt(req.params.id)
    try {
      let db = mongoCon.getConnection()
      res.status(200).json({ data: { success: 'bookorders delete' } })
    } catch (err) {
      next(createError(400, err.message))
    }
  }
}
