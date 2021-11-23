module.exports = {
  buildErrorMessages (err, type) {
    err.error = {
      type: type,
      description: []
    }
    for (const item of err.details) {
      err.error.description.push(item.message)
    }
    return err
  }
}
