const mongoCon = require('../dbs')
const createdError = require('http-errors')
const authorsCollection = 'authors'
const booksCollection = 'books'

async function authorExists(author_id){
  try {
    const db = await mongoCon.getConnection()
    const author = await db.collection(authorsCollection).findOne({id:author_id})
    return author !== null;
  } catch (err) {
    throw createdError(400,err)
  }
}

async function hasBooksWritten(author_id){
  try {
    const db = await mongoCon.getConnection()
    const author = await db.collection(booksCollection).findOne({author_id: author_id})
    return author !== null;
  } catch (err) {
    throw createdError(400,err)
  }
}

module.exports = {authorExists, hasBooksWritten}
