var parser = require('../../lib/parser')

module.exports = function(formula) {
  return {formula: parser.formula(formula)}
}
