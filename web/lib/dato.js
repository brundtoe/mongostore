module.exports = function toDatoString (dato) {
  const [dag, md, year] = dato.toLocaleDateString('en-DK').split('/')
  return `${year}-${md}-${dag}`
}
