const mongoCon = require('../dbs')
const { getNextId } = require('../lib/getNextId')
const { authorExists } = require('../lib/authorExists')
const { hasOrderlines } = require('../lib/bookExists')
const msg = require('../lib/messages')
const booksCollection = 'books'

module.exports = {
  async findAll () {
    try {
      let db = await mongoCon.getConnection()
      const query = {}
      const fields = {
        _id: 1,
        id: 1,
        title: 1,
        published: 1,
        bookprice: 1,
        isbn: 1,
        onhand: 1,
        author_id: 1,
        firstname: '$author.firstname',
        lastname: '$author.lastname'
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
      const query = {id: book_id}
      const fields = {
        _id: 1,
        id: 1,
        author_id: 1,
        firstname: '$author.firstname',
        lastname: '$author.lastname',
        title: 1,
        published: 1,
        bookprice: 1,
        onhand: 1,
        isbn: 1
      }

      const join = {
        from: 'authors',
        localField: 'author_id',
        foreignField: 'id',
        as: 'author'
      }

      let col = db.collection(booksCollection)
      let book = await col.aggregate([
        { '$match': query },
        { '$lookup': join },
        { '$unwind': '$author' },
        { '$project': fields }
      ]).toArray()



      return book[0] ? { data: book[0] } : msg.record_not_found(book_id, 'Book')
    } catch (err) {
      return msg.action_failed(err.message)
    }
  },
  async deleteById (book_id) {

    try {
      const orderline = await hasOrderlines(book_id)
      if (orderline) return msg.book_has_orderlines(book_id)

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

      const db = await mongoCon.getConnection()
      const result = await db.collection(booksCollection).findOneAndReplace({ id: book_id }, book, { returnDocument: 'after' })
      return (result.ok === 1 && result.value) ? msg.record_updated(book.id, 'book') : msg.record_not_found(book.id, 'Book')

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
      return (result.acknowledged) ? msg.record_created(book.id, 'book') : msg.action_failed('Book save')

    } catch (err) {
      return msg.action_failed(err.message)
    }
  }
}

