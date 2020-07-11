const mongoCon = require('../dbs')
const createError = require('http-errors')
const booksCollecion = 'books'

/**
 * hver item i oline består af objektet {book_id, numbooks}
 * book:id skal være unique
 *
 * @param oline[]
 */

function isOlineValid(oline) {
  const unique = new Set()
  oline.forEach(line => unique.add(line.book_id) )
  return unique.size === oline.length
}

async function buildOline(oline) {

  let db = await mongoCon.getConnection()
  const numLines = oline.length
  let orderlines = []
  for (let i = 0; i < numLines; i++) {
    let item = oline[i]
    let book = await db.collection(booksCollecion).findOne({ id: parseInt(item.book_id) })
    if (!book) {
      throw new Error(`Bogen med nummer ${item.book_id} findes ikke`)
    }
    let line = {
      book_id: book.id,
      title: book.title,
      salesprice: book.bookprice,
      numbooks: item.numbooks
    }
    orderlines.push(line)
  }
  return orderlines
}

module.exports = {isOlineValid, buildOline}
