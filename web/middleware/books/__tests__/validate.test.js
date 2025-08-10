const validate = require('../validate')
const Joi = require('joi')

describe('Validering af book schema', () => {

  const res = jest.fn()
  const next = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should succeed with book show', () => {
    const req = {
      params: {
        id: 4
      }
    }
    validate.show(req,res,next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeUndefined()
  })

  test('Should fail to show with book string', () => {
    const req = {
      params: {
        id: 'dummy'
      }
    }
    validate.show(req,res,next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Book_id skal være numerisk' })
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
  })

  test('should validate delete with number', () => {
    const req = {
      params: {
        id: 4
      }
    }
    validate.delete(req,res,next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeUndefined()
  })

  test('Should fail to delete with book string', () => {
    const req = {
      params: {
        id: 'dummy'
      }
    }
    validate.delete(req,res,next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Book_id skal være numerisk' })
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
  })

  test('Should post succeed with book', async() => {
    const req = {
      body: {
        author_id: 3,
        title: 'Professional MongoDB',
        bookprice: 18.49,
        published: '2020-07-12',
        onhand: 43
      }
    }
    await validate.post(req,res,next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeUndefined()
  })

  test('Should put succeed with book', async() => {
    const req = {
      body: {
        _id: "5eef84a264ee594e266c8dd3",
        id: 3,
        author_id: 3,
        title: 'Professional MongoDB',
        bookprice: 18.49,
        published: '2020-07-12',
        onhand: 43
      }
    }
    await validate.put(req,res,next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeUndefined()
  })
})
