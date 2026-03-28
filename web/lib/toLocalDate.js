const { DateTime } = require('luxon')

function toLocalDate(utcDate) {
  if (!utcDate) return ''

  const localDateTime = DateTime.fromJSDate(utcDate, { zone: 'Europe/Copenhagen' })
  return localDateTime.toISO().substring(0, 19).replaceAll('T', ' ')
}

module.exports = toLocalDate
