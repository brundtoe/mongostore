const mongoCon = require('../../dbs')
const createError = require('http-errors')
const { getNextId } = require('../../lib/getNextId')
const { isOlineValid, buildOline } = require('../../lib/orderlines')
const hostname = require('../../config').host()

const ordersCollection = 'bookorders'

module.exports = {
  async index (req, res, next) {
    try {
      let db = await mongoCon.getConnection()
      const bookorders = await db.collection(ordersCollection).find().toArray()
      const result = bookorders.map(order => {
        return {
          id: order.id,
          orderdate: order.orderdate,
          //shipdate: order.shipdate,
          link: `${hostname}/orders/${order.id}`
        }
      })
      res.status(200)
      res.json({ data: result })
    } catch (err) {
      next(createError(400, err.message))
    }
  },

  async show (req, res, next) {
    const order_id = parseInt(req.params.id)
    try {
      let db = await mongoCon.getConnection()
      const bookorder = await db.collection(ordersCollection).findOne({ id: order_id })
      res.status(200).json({ data: bookorder })
    } catch (err) {
      next(createError(400, err.message))
    }
  },

  async save (req, res, next) {
    try {
      const isValid = isOlineValid(req.body.lines)
      if (!isValid) throw new Error('Duplicate Books found in orderline')
      req.body.lines = await buildOline(req.body.lines)
      const order_id = await getNextId('bookorder_id')
      const db = await mongoCon.getConnection()
      req.body.id = order_id.value.next_value
      const result = await db.collection(ordersCollection).insertOne(req.body)
      const order = await db.collection(ordersCollection).findOne({id : req.body.id})
      res.status(201).json({
        data: {
          acknowledged: result.acknowledged,
          insertId: result.insertedId,
          order: order
        }
      })
    } catch (err) {
      next(createError(400, err.message))
    }
  },

  async update (req, res, next) {
    const order_id = parseInt(req.body.id)
    try {
      let db = await mongoCon.getConnection()
      const order = await db.collection(ordersCollection).findOneAndUpdate({ id: order_id },
        {
          $set: {
            shipdate: req.body.shipdate || null,
            paydate: req.body.paydate || null,
            invoicedate: req.body.invoicedate || null,
            invoice: req.body.invoice || null,
            paymethod: req.body.paymethod || null,
            shipby: req.body.shipby || null
          }
        },
        {returnDocument: 'after'})
      res.status(200).json({ data: order })
    } catch (err) {
      next(createError(400, err.message))
    }
  },

  async delete (req, res, next) {
    const order_id = parseInt(req.params.id)
    try {
      const db = await mongoCon.getConnection()
      const result = await db.collection(ordersCollection).findOneAndDelete({ id: order_id })
      res.status(200).json({ data: result })
    } catch (err) {
      next(createError(400, err.message))
    }
  }
}
