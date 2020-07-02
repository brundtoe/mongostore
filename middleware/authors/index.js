const mongoCon = require('../../dbs')
const assert = require('assert')
const userCollection = 'authors'

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
      let col = db.collection(userCollection)
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
  async save (req, res, next) {
    res.status(200).json({success: 'Authors save function'})
  },
  async update (req, res, next) {
    res.status(200).json({success: 'Authors update function'})
  },
  async delete (req, res, next) {
    res.status(200).json({success: 'Authors delete function'})
  }

}
