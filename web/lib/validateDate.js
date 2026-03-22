/**
 * @param inputText date in format yyyy/mm/dd or yyyy-mm-dd
 * @returns {boolean} true for valid and false for invalid date
 */

const dateTimeRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

function isDateValid (str) {

  const dateNormalized = str.replaceAll('/','-')
  if (!dateRegex.test(dateNormalized)) return false;
  const [y, m, d] = dateNormalized.split('-').map(Number)
  const dato = new Date(y, m - 1, d);
  return dato.getFullYear() === y && dato.getMonth() === m - 1 && dato.getDate() === d;

}

function isValidDateTime(str) {

  const dateNormalized = str.replaceAll('/','-')
  if (!dateTimeRegex.test(dateNormalized)) return false;
  const [datePart, timePart] = dateNormalized.split(' ')
  const [y, m, d] = datePart.split('-').map(Number)
  const dato = new Date(y, m - 1, d);
  return dato.getFullYear() === y && dato.getMonth() === m - 1 && dato.getDate() === d;
}

module.exports = {isDateValid, isValidDateTime}
