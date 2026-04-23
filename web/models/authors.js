const mongoCon = require('../dbs')
const { getNextId } = require('../lib/getNextId')
const findes = require('../lib/authorExists')
const msg = require('../lib/messages')
const authorsCollection = 'authors'
const { DateTime } = require('luxon')

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
        created_at: 1,
        updated_at: 1,
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
      if (author) {
        author.created_at = DateTime.fromJSDate(author.created_at)
          .setZone('Europe/Copenhagen')
          .toFormat('yyyy-MM-dd HH:mm:ss')
        if (author.updated_at) {
          author.updated_at = DateTime.fromJSDate(author.updated_at)
            .setZone('Europe/Copenhagen')
            .toFormat('yyyy-MM-dd HH:mm:ss')
        } else {
          author.updated_at = ''
        }
      }
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
      return result ? msg.record_deleted(author_id, 'Author') : msg.record_not_found(author_id, 'Author')

    } catch (err) {
      return msg.action_failed(err.message)
    }
  },
  async updateById (author) {
    let db = await mongoCon.getConnection()
    try {
      const authorOld = await findes.authorExists(author.id)
      if (!authorOld) return msg.record_not_found(author.id, 'Author')
      author.created_at = authorOld.created_at
      author.updated_at = DateTime.now().setZone('Europe/Copenhagen')
      const result = await db.collection(authorsCollection).findOneAndReplace({ id: author.id }, author, { returnDocument: 'after' })
      return result ? msg.record_updated(author.id, 'author') : msg.record_not_found(author.id, 'Author')
    } catch (err) {
      return msg.action_failed(err.message)
    }
  },

  async save (author) {
    const createdAt = DateTime.fromFormat(process.env.CREATED_AT,'yyyy-MM-dd HH:mm:ss') || DateTime.now().setZone('Europe/Copenhagen')
    author.updated_at = createdAt
    try {
      const author_id = await getNextId('author_id')
      let db = await mongoCon.getConnection()
      author.id = author_id.next_value
      const result = await db.collection(authorsCollection).insertOne(author)
      return (result.acknowledged) ? msg.record_created(author.id, 'author') : msg.action_failed('Author save')

    } catch (err) {
      return msg.action_failed(err.message)
    }
  },
}
