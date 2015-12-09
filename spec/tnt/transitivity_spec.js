var jstest        = require('jstest').Test,
    theorem       = require('../util/theorem'),
    assertFormula = require('../util/assert_formula')

var transitivity = require('../../lib/tnt/transitivity')

jstest.describe('transitivity', function() { with(this) {
  it('combines two atoms with a term in common', function() { with(this) {
    var s = theorem('a = b'), t = theorem('b = c')
    assertFormula( 'a = c', transitivity(s, t) )
  }})

  it('rejects non-atom formulas', function() { with(this) {
    assertThrows(Error, function() { transitivity(theorem('a = b'), theorem('<c=d | e=f>')) })
    assertThrows(Error, function() { transitivity(theorem('<a=b | c=d>'), theorem('e = f')) })
  }})

  it('rejects formulas with non-matching terms', function() { with(this) {
    assertThrows(Error, function() { transitivity(theorem('a = b'), theorem('c = d')) })
  }})
}})
