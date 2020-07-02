const mongoCon = require('../../dbs')
const assert = require('assert')
const userCollection = 'books'

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
      let col = db.collection(userCollection)
      let cursor = await col.aggregate([
        { '$match': query},
        {'$lookup': join },
        {'$unwind': '$author'},
        {'$project': fields}
      ]).toArray()
      res.status(200).json({data: cursor})
    } catch (err) {
      next(err)
    }
  },
  async save (req, res, next) {
    res.status(200).json({success: 'Books save function'})
  },
  async update (req, res, next) {
    res.status(200).json({success: 'Books update function'})
  },
  async delete (req, res, next) {
    res.status(200).json({success: 'Books delete function'})
  }

}
