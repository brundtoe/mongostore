const express = require('express')
const authorsRoute = require('../authors')
const request = require('supertest')

const app = express()
app.use("/api/authors",authorsRoute)

describe('Supertest af author routes med supertest', () => {

  it('should succeed getting bookstore authors', () => {
    return request(app)
      .get('/api/authors')
      .set('Accept', 'application/json')
      .expect(200)
  })

  it('should succeed in getting author 1', () => {
    return request(app)
      .get('/api/authors/1')
      .set('Accept', 'applications/json')
      .expect(200)
  })

  it('should fail to get non existing author', () => {
    return request(app)
      .get('/api/authors/9999')
      .set('Accept', 'applications/json')
      .expect(404)
  })

  it('should fail to delete author with books', () => {
    return request(app)
      .delete('/api/authors/7')
      .set('Accept', 'applications/json')
      .expect(403)
  })

  it('should fail to delete non existing author', () => {
    return request(app)
      .delete('/api/authors/9999')
      .set('Accept', 'applications/json')
      .expect(404)
  })

})
