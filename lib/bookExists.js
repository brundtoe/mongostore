const mongoCon = require('../dbs')
const createdError = require('http-errors')
const bookCollection = 'books'

async function bookExists(book_id){
  try {
    const db = await mongoCon.getConnection()
    const book = await db.collection(bookCollection).findOne({id:book_id})
    return book !== null;
  } catch (err) {
    throw createdError(400,err)
  }
}

module.exports = {bookExists}
