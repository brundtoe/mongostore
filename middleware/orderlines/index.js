const mongoCon = require('../../dbs')
const createError = require('http-errors')
const ordersCollection = 'bookorders'

module.exports = {
  save: async (req,res,next) => {
    try {
      const db = await mongoCon.getConnection()
      res.status(201).json({ data: { success: 'orderlines save' } })
    } catch (err) {
      next(createError(400,err))
    }
  },
  update: async (req,res,next) => {
    try {
      const db = await mongoCon.getConnection()
      res.status(201).json({ data: { success: 'orderlines update' } })
    } catch (err) {
      next(createError(400,err))
    }
  },
  delete: async (req,res,next) => {
    try {
      const db = await mongoCon.getConnection()
      res.status(201).json({ data: { success: 'orderlines delete' } })
    } catch (err) {
      next(createError(400,err))
    }
  }

}

