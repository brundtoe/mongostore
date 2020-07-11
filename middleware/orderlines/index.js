const mongoCon = require('../../dbs')
const createError = require('http-errors')
const ordersCollection = 'bookorders'
const booksCollection = 'books'
const {bookExists} = require('../../lib/bookExists')

module.exports = {
  save: async (req,res,next) => {
    const {order_id, book_id, numbooks} = req.body
    try {
      const db = await mongoCon.getConnection()
      const book = await db.collection(booksCollection).findOne({id: parseInt(book_id)})
      if (!book) throw new  Error(`Bogen med nummer ${book_id} findes ikke`)
      const line = await db.collection(ordersCollection).findOne({id: parseInt(order_id), "lines.book_id": parseInt(book_id)})
      if (line) throw new Error(`Der findes allerede en ordrelinje for bog nummer ${book_id}`)
      const orderline = {
        book_id: parseInt(book.id),
        title: book.title,
        salesprice: book.bookprice,
        numbooks: parseInt(numbooks)
      }
      const order = await db.collection(ordersCollection).findOneAndUpdate({id: parseInt(order_id)},{
       $push: { lines: orderline }}, { returnOriginal: false}
      )
      res.status(201).json({ data: order })
    } catch (err) {
      next(createError(400,err))
    }
  },
  update: async (req,res,next) => {
    const {order_id, book_id, numbooks} = req.body
    try {
      const db = await mongoCon.getConnection()
      const book = await bookExists(parseInt(book_id))
      if (!book) throw new  Error(`Bogen med nummer ${book_id} findes ikke`)
      const order = await db.collection(ordersCollection).findOneAndUpdate({id: parseInt(order_id), "lines.book_id": parseInt(book_id)},
        { $set: {"lines.$.numbooks": parseInt(numbooks)}},
        { returnOriginal: false} )
      res.status(201).json({ data: order })
    } catch (err) {
      next(createError(400,err))
    }
  },
  delete: async (req,res,next) => {
    const order_id = parseInt(req.params.order_id)
    const book_id = parseInt(req.params.book_id)
    try {
      const db = await mongoCon.getConnection()
      const book = await bookExists(book_id)
      if (!book) throw new Error(`Bogen med nummer ${book_id} findes ikke`)
      const result = await db.collection(ordersCollection).findOneAndUpdate({id: order_id},
      {
        $pull: {"lines": {"book_id": book_id}}
      }, { returnOriginal: false})
      res.status(200).json({ data: result })
    } catch (err) {
      next(createError(400,err))
    }
  }

}

