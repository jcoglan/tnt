var jstest        = require('jstest').Test,
    theorem       = require('../util/theorem'),
    assertFormula = require('../util/assert_formula')

var add_succ = require('../../lib/tnt/add_succ')

jstest.describe('add_succ', function() { with(this) {
  it('adds S to both sides of an atom', function() { with(this) {
    var t = theorem('a = b')
    assertFormula( 'Sa = Sb', add_succ(t) )
  }})

  it('rejects a non-atom', function() { with(this) {
    assertThrows(Error, function() { add_succ(theorem('~ a = b')) })
  }})
}})
