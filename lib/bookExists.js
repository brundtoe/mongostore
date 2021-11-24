const mongoCon = require('../dbs')
const createdError = require('http-errors')
const booksCollection = 'books'
const orderlinesCollection = 'orderlines'

async function bookExists(book_id){
  try {
    const db = await mongoCon.getConnection()
    const book = await db.collection(booksCollection).findOne({id:book_id})
    return book !== null;
  } catch (err) {
    throw createdError(400,err)
  }
}

async function hasOrderlines(book_id){
  try {
    const db = await mongoCon.getConnection()
    const orderline = await db.collection(orderlinesCollection).findOne({book_id:book_id})
    return orderline !== null;
  } catch (err) {
    throw createdError(400,err)
  }
}

module.exports = {bookExists, hasOrderlines}
