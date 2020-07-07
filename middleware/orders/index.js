const mongoCon = require('../../dbs')
const createError = require('http-errors')
const { getNextId } = require('../../lib/getNextId')
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
          link: `http://localhost:3000/orders/${order.id}`
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
      let db = await mongoCon.getConnection()
      res.status(200).json({ data: { success: 'bookorders save' } })
    } catch (err) {
      next(createError(400, err.message))
    }
  },
  async update (req, res, next) {
    const order_id = parseInt(req.params.id)
    try {
      let db = await mongoCon.getConnection()
      res.status(200).json({ data: { success: 'bookorders update' } })
    } catch (err) {
      next(createError(400, err.message))
    }
  },
  async delete (req, res, next) {
    const order_id = parseInt(req.params.id)
    try {
      let db = await mongoCon.getConnection()
      res.status(200).json({ data: { success: 'bookorders delete' } })
    } catch (err) {
      next(createError(400, err.message))
    }
  }
}
