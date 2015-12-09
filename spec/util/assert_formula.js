var assert  = require('assert'),
    parser  = require('../../lib/parser'),
    printer = require('../../lib/util/printer')

module.exports = function(formula, sexp) {
  formula = parser.formula(formula)
  var message = 'Expected {' + printer.show(formula) + '}, got {' + printer.show(sexp) + '}'
  assert.deepEqual(sexp, formula, message)
}
