const mongoCon = require('../../dbs')
const createError = require('http-errors')
const { getNextId } = require('../../lib/getNextId')
const books = require('../../models/books')
const authors = require('../../models/authors')
const booksCollection = 'books'

module.exports = {
  async index (req, res, next) {

    try {
      const data = await books.findAll()
      const status = data['data'] ? 200 : 404
      res.status(status).json(data)
    } catch (err) {
      next(err)
    }
  },

  async show (req, res, next) {
    const book_id = parseInt(req.params.id)

    try {
      const data = await books.findById(book_id)
      const status = data['data'] ? 200 : 404
      res.status(status).json(data)
    } catch (err) {
      next(err)
    }
  },

  async save (req, res, next) {
    const book = {
      id: null,
      author_id: req.body.author_id,
      title: req.body.title,
      published: req.body.published,
      bookprice: req.body.bookprice,
      isbn: req.body.isbn,
      onhand: req.body.onhand
    }
    try {
      const data = await books.save(book)
      res.status(201).json(data)

    } catch (err) {
      next(err)
    }

  },

  async update (req, res, next) {
    const book_id = parseInt(req.body.id)
    const book = {
      id: book_id,
      author_id: req.body.author_id,
      title: req.body.title,
      published: req.body.published,
      bookprice: req.body.bookprice,
      isbn: req.body.isbn,
      onhand: req.body.onhand
    }
    try {
      const data = await books.updateById(book)
      const status = data['data'] ? 200 : 404
      res.status(status).json(data)
    } catch (err) {
      next(err)
    }

  },

  async delete (req, res, next) {
    const book_id = parseInt(req.params.id)
    try {
      const data = await books.deleteById(book_id)
      let status
      if (data.data) {
        status = 200
      } else {
        status = data.error.type === 'NOT_ALLOWED' ? 403 : 404
      }
      res.status(status).json(data)
    } catch (err) {
      next(err)
    }
  }

}
