const createError = require('http-errors')

module.exports = {
  notFound (req, res, next) {
    const httpError = createError(404, 'Resource not found')
    next(httpError)
  },
// eslint-disable-next-line no-unused-vars
  errorResponse (err, req, res, next) {

    res.locals.error = req.app.get('env') === 'development' ? err : {}

    if (err.code == 'EBADCSRFTOKEN') {
      res.locals.message = 'The form has been tamperede with'
      err.status = 403
    } else {
      res.locals.message = err.message
    }

    // render the error page
    res.status(err.status || 500)
    res.json(err)
  }
}
