const mongoCon = require('../../dbs')
const assert = require('assert')
const userCollection = 'books'

module.exports = {
  async index (req, res, next) {

    try {
      let db = mongoCon.getConnection()
      query = {
        author_id: { $in: [3] }
      }
      fields = {
        id: 1,
        title: 1,
        published: 1,
        onhand: 1,
        _id: 0
      }
      options = {
        sort: { id: -1 },
        limit: 99
      }
      let col = db.collection(userCollection)
      let cursor = await col.find(query, options).project(fields).toArray()
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
