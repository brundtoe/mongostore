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
  },
  invalidDateMessage (invalidDato) {
    return {
      error: {
        type: 'VALIDATION_ERROR',
        description: [
          `Date Published: ${invalidDato} er ikke en gyldig dato`
        ]
      }
    }
  }
}
