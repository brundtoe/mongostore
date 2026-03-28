const { DateTime } = require('luxon')
/*
const toLocalDate = require('./toLocalDate')

const utcDate = new Date()
console.log(utcDate)
console.log(toLocalDate(utcDate))
*/
//const dt = DateTime.fromJSDate(utcDate, { zone: 'Europe/Copenhagen' }).toJSDate()
//const jsDate = dt.toJSDate()

const dt = DateTime.now().setZone('Europe/Copenhagen')
console.log('raw luxon',dt)
console.log('toString',dt.toString())
console.log('toFormat',dt.toFormat('yyyy-MM-dd HH:mm:ss'))
console.log('toISO',dt.toISO())
console.log('toUTC',dt.toUTC().toISO())
console.log('toLocal',dt.toLocal().toISO())
const jsDate = dt.toJSDate()
console.log('toJSDate',jsDate)
