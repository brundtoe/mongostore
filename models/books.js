const mongoCon = require('../dbs')
const { getNextId } = require('../lib/getNextId')
const booksCollection = 'books'

module.exports = {
  async findAll() {
    try {
      let db = await mongoCon.getConnection()
      const query = {
        author_id: 5
      }
      const fields = {
        _id: 0,
        id: 1,
        title: 1,
        published: 1,
        onhand: 1,
        name: { $concat: ['$author.firstname', ' ', '$author.lastname']}
      }

      const join = {
        from: "authors",
        localField: "author_id",
        foreignField: "id",
        as: "author"
      }

      let col = db.collection(booksCollection)
      let cursor = await col.aggregate([
        { '$match': query},
        {'$lookup': join },
        {'$unwind': '$author'},
        {'$project': fields}
      ]).toArray()
      return cursor ? { 'data': cursor } : {
        error: {
          type: 'RESOURCE_NOT_FOUND',
          description: 'Books collection findes ikke',
        }
      }
    } catch (err) {
      return action_failed(err.message)
    }
  },

  async findById(book_id){
    try {
      let db = await mongoCon.getConnection()
      const book = await db.collection(booksCollection).findOne({id:book_id})
      return book ? { data: book } : book_not_found(book_id)
    } catch (err) {
      return action_failed(err.message)
    }
  },
  async deleteById(book_id){

    try {
      const db = await mongoCon.getConnection()
      const result = await db.collection(booksCollection).findOneAndDelete({ id: book_id })
      return (result.ok === 1) ? book_slettet(book_id) : book_not_found(book_id)
    } catch (err) {
      return action_failed(err.message)
    }
  },
  async updateById(book){
    const book_id = parseInt(book.id)
    try {
      const db = await mongoCon.getConnection()
      const result = await db.collection(booksCollection).findOneAndReplace({ id: book_id },book,{returnDocument: 'after'})
      return (result.ok === 1) ? book_opdateret(book.id) : book_not_found(book.id)

    } catch (err) {
      return action_failed(err.message)
    }
  },
  async save(book){
    try {
      const book_id = await getNextId('book_id')
      const db = await mongoCon.getConnection()
      book.id = book_id.value.next_value
      const result = await db.collection(booksCollection).insertOne(book)
      return (result.acknowledged) ? book_oprettet : action_failed('Book save')

    } catch (err) {
      return action_failed(err.message)
    }
  }
}



/**
 * Functions to return messages
 */
function book_not_found (book_id) {
  return {
    error: {
      type: 'RESOURCE_NOT_FOUND',
      description: `Book ${book_id} findes ikke`,
    }
  }
}

function book_slettet (book_id) {
  return {
    data: {
      message: `Book ${book_id} er slettet`,
      book_id: book_id
    }
  }
}

function book_opdateret(book_id){
  return {
    data: {
      message: `Opdateret book ${book_id}`,
      book_id: book_id
    }
  }
}

function book_oprettet(book_id) {
  return {
    data:
      {
        message: `Oprettet book ${book_id}`,
        book_id: book_id
      }
  }
}

function action_failed(action) {
  return {
    error: {
      type: 'RESOURCE_NOT_FOUND',
      description: `Transaktionen ${action} fejlede`,
    }
  }
}
