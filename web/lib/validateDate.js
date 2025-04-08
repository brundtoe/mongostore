/**
 * @param inputText date in format yyyy/mm/dd or yyyy-mm-dd
 * @returns {boolean} true for valid and false for invalid date
 */

module.exports = function isDateValid (inputText) {
  const dateformat = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
  // Match the date format through regular expression
  if (inputText.match(dateformat)) {
    //Test which seperator is used '/' or '-'
    const opera1 = inputText.split('/')
    const opera2 = inputText.split('-')
    const lopera1 = opera1.length
    const lopera2 = opera2.length
    // Extract the string into month, date and year
    let pdate
    if (lopera1 > 1) {
      pdate = inputText.split('/')
    } else if (lopera2 > 1) {
      pdate = inputText.split('-')
    }
    const dd = parseInt(pdate[2])
    const mm = parseInt(pdate[1])
    const yy = parseInt(pdate[0])
    // Create list of days of a month [assume there is no leap year by default]
    const ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (mm === 1 || mm > 2) {
      if (dd > ListofDays[mm - 1]) {
        //console.log('Invalid number of days in month!')
        return false
      }
    }
    // handle lead year
    if (mm === 2) {
      let lyear = false
      if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
        lyear = true
      }
      if ((lyear === false) && (dd >= 29)) {
        //console.log('It\'s not a leap year - and Invalid number of days in february!')
        return false
      }
      if ((lyear === true) && (dd > 29)) {
        //console.log('It's a leap year - but Invalid number of days!')
        return false
      }
    }
  } else {
    //console.log('Invalid date format!')
    return false
  }
  return true
}

