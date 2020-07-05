const mongoCon = require('../../dbs')
const createError = require('http-errors')
const {getNextId} = require('../../lib/getNextId')
const booksCollection = 'books'

module.exports = {
  async index (req, res, next) {

    try {
      let db = mongoCon.getConnection()
      query = {
        author_id: 5
      }
      fields = {
        _id: 0,
        id: 1,
        title: 1,
        published: 1,
        onhand: 1,
        name: { $concat: ['$author.firstname', ' ', '$author.lastname']}
      }

      join = {
        from: "authors",
          localField: "author_id",
          foreignField: "id",
          as: "author"
      }

      options = {
        sort: { id: 1 },
      }
      let col = db.collection(booksCollection)
      let cursor = await col.aggregate([
        { '$match': query},
        {'$lookup': join },
        {'$unwind': '$author'},
        {'$project': fields}
      ]).toArray()
      res.status(200).json({data: cursor})
    } catch (err) {
      next(createError(400, err.message))
    }
  },

  async show (req,res,next)  {
    try {
      const id = parseInt(req.params.id)
      let db = mongoCon.getConnection()
      const book = await db.collection(booksCollection).findOne({id:id})
      res.status(200).json({data: book })
    } catch (err) {
      next(createError(400, err.message))
    }
  },
  async save (req, res, next) {
    try {
      const book = await getNextId('book_id')
      const db = mongoCon.getConnection()
      req.body.id = book.value.next_value
      const result = await db.collection(booksCollection).insertOne(req.body)
      res.status(201).json({
        data: {
          insertedCount: result.insertedCount,
          insertedId: result.insertedId,
          book: result.ops[0]
        }
      })
    } catch (err) {
      next(createError(400, err.message))
    }
  },
  async update (req, res, next) {
    const book_id = parseInt(req.body.id)
    try {
      const db = mongoCon.getConnection()
      const result = await db.collection(booksCollection).findOneAndReplace({ id: book_id },
        {
          id: book_id,
          author_id: req.body.author_id,
          title: req.body.title,
          published: req.body.published,
          bookprice: req.body.bookprice,
          isbn: req.body.isbn,
          onhand: req.body.onhand
        },{returnOriginal:false})
      res.status(201).json(result)
    } catch (err) {
      next(createError(400, err.message))
    }
  },
  async delete (req, res, next) {
    const book_id = parseInt(req.params.id)
    try {
      const db = mongoCon.getConnection()
      const result = await db.collection(booksCollection).findOneAndDelete({ id: book_id })
      res.status(200).json({ data: result })
    } catch (err) {
      next(createError(400, err.message))
    }
  }

}
