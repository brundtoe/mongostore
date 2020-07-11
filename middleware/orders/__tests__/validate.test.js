const validate = require('../validate')
const Joi = require('@hapi/joi')

describe('validering af orders', () => {

  test('should accept integer on show', () => {
    const req = {
      params: {
        id: 23
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    validate.show(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
  })

  test('should throw error on show double', () => {
    const req = {
      params: {
        id: 23.56
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    validate.show(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ message: '"value" must be an integer' })
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
  })


  test('should throw error on show string', () => {
    const req = {
      params: {
        id: 'dummy'
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    validate.show(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ message: '"value" must be a number' })
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
  })

  test('should accept integer on delete', async () => {
    const req = {
      params: {
        id: 3
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.delete(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeUndefined()
  })

  test('should throw error on nonexisting order', async () => {
    const req = {
      params: {
        id: 23
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.delete(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0].message).toBe('order does not exist')
  })

  test('should throw error on delete with double', async () => {
    const req = {
      params: {
        id: 23.56
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.delete(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ message: '"value" must be an integer' })
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
  })

  test('should throw error on delete string', async() => {
    const req = {
      params: {
        id: 'dummy'
      }
    }
    const res = jest.fn()
    const next = jest.fn()
    await validate.delete(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ _original: 'dummy' })
    expect(next.mock.calls[0][0]).toContainKey('details')
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
    expect(next.mock.calls[0][0]).toMatchObject({ message: '"value" must be a number' })
  })
})
