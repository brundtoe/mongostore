const express = require('express')
const booksRoute = require('../books')
const request = require('supertest')

const app = express()
app.use("/api/books",booksRoute)

describe('Supertest af book routes med supertest', () => {

  it('should succeed getting bookstore books', () => {
    return request(app)
      .get('/api/books')
      .set('Accept', 'application/json')
      .expect(200)
  })

  it('should succeed in getting book 1', () => {
    return request(app)
      .get('/api/books/1')
      .set('Accept', 'applications/json')
      .expect(200)
  })

  it('should fail to get non existing book', () => {
    return request(app)
      .get('/api/books/9999')
      .set('Accept', 'applications/json')
      .expect(404)
  })

})
