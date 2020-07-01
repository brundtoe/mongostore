const mongoCon = require('../../dbs')
const assert = require('assert')
const userCollection = 'books'

module.exports = {
  async index (req, res, next) {
    res.status(200).json({success: 'Books index function'})
  },
  async save (req, res, next) {
    res.status(200).json({success: 'Books save function'})
  },
  async update (req, res, next) {
    res.status(200).json({success: 'Books update function'})
  },
  async delete (req, res, next) {
    res.status(200).json({success: 'Books delete function'})
  }

}
