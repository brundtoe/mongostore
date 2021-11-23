const mongoCon = require('../dbs')
const { getNextId } = require('../lib/getNextId')
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
        _id: 0,
        id: 1,
        name: { $concat: ['$firstname', ' ', '$lastname'] },
        mail: 1,
        'bookswritten.title': 1,
        'bookswritten.published': 1
      }

      let col = db.collection(authorsCollection)
      let cursor = await col.aggregate([
        { '$match': query },
        { '$lookup': join },
        { '$project': fields },
        { '$limit': 4 }
      ]).toArray()
      return cursor ? { 'data': cursor } : {
        error: {
          type: 'RESOURCE_NOT_FOUND',
          description: 'Authors collection findes ikke',
        }
      }
    } catch(err) {
      return action_failed(err.message)
    }
  },

  async findById (author_id) {
    try {
      let db = await mongoCon.getConnection()
      const author = await db.collection(authorsCollection).findOne({ id: author_id })
      return author ? { data: author } : author_not_found(author_id)
    } catch (err) {
      return action_failed(err.message)
    }
  },

  async deleteById (author_id) {
    try {
      let db = await mongoCon.getConnection()
      const result = await db.collection(authorsCollection).findOneAndDelete({ id: author_id })
      return (result.ok === 1) ? author_slettet(author_id) : author_not_found(author_id)

    } catch (err) {
      return action_failed(err.message)
    }
  },
  async updateById (author) {
    let db = await mongoCon.getConnection()
    const result = await db.collection(authorsCollection).findOneAndReplace({ id: author.id }, author, { returnDocument: 'after' })
    return (result.ok === 1) ? author_opdateret(author.id) : author_not_found(author.id)
  },

  async save (author) {
    try {
      const author_id = await getNextId('author_id')
      let db = await mongoCon.getConnection()
      author.id = author_id.value.next_value
      const result = await db.collection(authorsCollection).insertOne(author)
      return (result.acknowledged) ? author_oprettet(author.id) : action_failed('Author save')

    } catch (err) {
      return action_failed(err.message)
    }
  },
}

/**
 * Functions to return messages
 */
function author_not_found (author_id) {
  return {
    error: {
      type: 'RESOURCE_NOT_FOUND',
      description: `Author ${author_id} findes ikke`,
    }
  }
}

function author_slettet (author_id) {
  return {
    data: {
      message: `Author ${author_id} er slettet`,
      author_id: author_id
    }
  }
}

function author_opdateret(author_id){
  return {
    data: {
      message: `Opdateret author ${author_id}`,
      author_id: author_id
    }
  }
}

function author_oprettet(author_id) {
  return {
    data:
      {
        message: `Oprettet author ${author_id}`,
        author_id: author_id
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
