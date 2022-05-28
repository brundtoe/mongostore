const mongoCon = require('../dbs')
const { getNextId } = require('../lib/getNextId')
const findes = require('../lib/authorExists')
const msg = require('../lib/messages')
const authorsCollection = 'authors'

module.exports = {
  async findAll () {

    try {
      let db = await mongoCon.getConnection()
      const query = {}

      const join = {
        from: 'books',
        localField: 'id',
        foreignField: 'author_id',
        as: 'bookswritten'
      }

      const fields = {
        _id: 1,
        id: 1,
        firstname: 1,
        lastname: 1,
        mail: 1,
        'bookswritten.title': 1,
        'bookswritten.published': 1
      }

      let col = db.collection(authorsCollection)
      let cursor = await col.aggregate([
        { '$match': query },
        { '$lookup': join },
        { '$project': fields }
      ]).toArray()
      return cursor ? { 'data': cursor } : msg.collection_not_found('Authors')
    } catch (err) {
      return msg.action_failed(err.message)
    }
  },

  async findById (author_id) {
    try {
      let db = await mongoCon.getConnection()
      const author = await db.collection(authorsCollection).findOne({ id: author_id })
      return author ? { data: author } : msg.record_not_found(author_id, 'Author')
    } catch (err) {
      return msg.action_failed(err.message)
    }
  },

  async deleteById (author_id) {
    try {
      const booksWritten = await findes.hasBooksWritten(author_id)
      if (booksWritten) return msg.author_has_books(author_id)

      let db = await mongoCon.getConnection()
      const result = await db.collection(authorsCollection).findOneAndDelete({ id: author_id })
      return (result.ok === 1 && result.value) ? msg.record_deleted(author_id,'Author') : msg.record_not_found(author_id, 'Author')

    } catch (err) {
      return msg.action_failed(err.message)
    }
  },
  async updateById (author) {
    try {
      let db = await mongoCon.getConnection()
      const result = await db.collection(authorsCollection).findOneAndReplace({ id: author.id }, author, { returnDocument: 'after' })
      return (result.ok === 1 && result.value) ? msg.record_updated(author.id, 'author') : msg.record_not_found(author.id, 'Author')
    } catch (err) {
      return msg.action_failed(err.message)
    }
  },

  async save (author) {
    try {
      const author_id = await getNextId('author_id')
      let db = await mongoCon.getConnection()
      author.id = author_id.value.next_value
      const result = await db.collection(authorsCollection).insertOne(author)
      return (result.acknowledged) ? msg.record_created(author.id, 'author') : msg.action_failed('Author save')

    } catch (err) {
      return msg.action_failed(err.message)
    }
  },
}
