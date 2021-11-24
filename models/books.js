const mongoCon = require('../dbs')
const { getNextId } = require('../lib/getNextId')
const { authorExists } = require('../lib/authorExists')
const {bookExists} = require('../lib/bookExists')
const msg = require('../lib/messages')
const booksCollection = 'books'

module.exports = {
  async findAll () {
    try {
      let db = await mongoCon.getConnection()
      const query = {}
      const fields = {
        _id: 0,
        id: 1,
        title: 1,
        published: 1,
        onhand: 1,
        name: { $concat: ['$author.firstname', ' ', '$author.lastname'] }
      }

      const join = {
        from: 'authors',
        localField: 'author_id',
        foreignField: 'id',
        as: 'author'
      }

      let col = db.collection(booksCollection)
      let cursor = await col.aggregate([
        { '$match': query },
        { '$lookup': join },
        { '$unwind': '$author' },
        { '$project': fields }
      ]).toArray()
      return cursor ? { 'data': cursor } : msg.collection_not_found('Books')
    } catch (err) {
      return msg.action_failed(err.message)
    }
  },

  async findById (book_id) {
    try {
      let db = await mongoCon.getConnection()
      const book = await db.collection(booksCollection).findOne({ id: book_id })
      return book ? { data: book } : msg.record_not_found(book_id, 'Book')
    } catch (err) {
      return msg.action_failed(err.message)
    }
  },
  async deleteById (book_id) {

    try {
      const found = await(bookExists(book_id))
      if (!found) return msg.record_not_found(book_id, 'Book')
      const db = await mongoCon.getConnection()
      const result = await db.collection(booksCollection).findOneAndDelete({ id: book_id })
      return (result.ok === 1 && result.value) ? msg.record_deleted(book_id, 'Book') : msg.record_not_found(book_id, 'Book')
    } catch (err) {
      return msg.action_failed(err.message)
    }
  },
  async updateById (book) {
    const book_id = parseInt(book.id)
    try {
      const author = await authorExists(parseInt(book.author_id))
      if (!author) return msg.record_not_found(book.author_id, 'Author')
      const found = await(bookExists(book_id))
      if (!found) return msg.record_not_found(book_id, 'Book')
      const db = await mongoCon.getConnection()
      const result = await db.collection(booksCollection).findOneAndReplace({ id: book_id }, book, { returnDocument: 'after' })
      return (result.ok === 1 && result.value) ? msg.record_updated(book.id,'Book') : msg.record_not_found(book.id, 'Book')

    } catch (err) {
      return msg.action_failed(err.message)
    }
  },
  async save (book) {
    try {
      const author = await authorExists(parseInt(book.author_id))
      if (!author) return msg.record_not_found(book.author_id, 'Author')

      const book_id = await getNextId('book_id')
      const db = await mongoCon.getConnection()
      book.id = book_id.value.next_value
      const result = await db.collection(booksCollection).insertOne(book)
      return (result.acknowledged) ? msg.record_created(book_id,'Book') : msg.action_failed('Book save')

    } catch (err) {
      return msg.action_failed(err.message)
    }
  }
}
