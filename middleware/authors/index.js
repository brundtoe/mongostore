const mongoCon = require('../../dbs')
const assert = require('assert')
const authorCollection = 'authors'

async function getNextAuthorId () {
  let db = mongoCon.getConnection()
  return db.collection('counters').findOneAndUpdate({ _id: 'author_id' }, { $inc: { next_value: 1 } }, { returnOriginal: true })
}

module.exports = {
  async index (req, res, next) {

    try {
      let db = mongoCon.getConnection()
      query = {}

      join = {
        from: "books",
        localField: "id",
        foreignField: "author_id",
        as: "bookswritten"
      }

      fields = {
        _id: 0,
        id: 1,
        name: { $concat: ['$firstname', ' ', '$lastname']},
        mail:1,
        'bookswritten.title':1,
        'bookswritten.published': 1
      }

      options = {
        sort: { id: 1 },
        limit: 4
      }
      let col = db.collection(authorCollection)
      let cursor = await col.aggregate([
        { '$match': query},
        {'$lookup': join },
        {'$project': fields}
      ], options).toArray()
      res.status(200).json({data: cursor})
    } catch (err) {
      next(err)
    }
  },

  async show (req,res,next) {
    try{
      const id = parseInt(req.params.id)
      let db = mongoCon.getConnection()
      const author = await db.collection(authorCollection).findOne({id:id})
      res.status(200).json({data: author})
    } catch (err) {
      next(err)
    }
  },
  async save (req, res, next) {
    try {
      const author_id = await getNextAuthorId()
      const db = mongoCon.getConnection()
      req.body.id = author_id.value.next_value
      const result = await db.collection(authorCollection).insertOne(req.body)
      res.status(201).json({
        data: {
          insertedCount: result.insertedCount,
          insertedId: result.insertedId,
          author: result.ops[0]
        }
      })
    } catch (err) {
      next(createError(400, err.message))
    }

  },
  async update (req, res, next) {
    const author_id = parseInt(req.body.id)
    try {
      const db = mongoCon.getConnection()
      const result = await db.collection(authorCollection).findOneAndReplace({ id: author_id },
        {
          id: author_id,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          mail: req.body.mail
        },{returnOriginal:false})
      res.status(201).json(result)
    } catch (err) {
      next(createError(400, err.message))
    }
  },
  async delete (req, res, next) {
    const author_id = parseInt(req.params.id)
    try {
      const db = mongoCon.getConnection()
      const result = await db.collection(authorCollection).findOneAndDelete({ id: author_id })
      res.status(200).json({ data: result })
    } catch (err) {
      next(err)
    }
  }

}
