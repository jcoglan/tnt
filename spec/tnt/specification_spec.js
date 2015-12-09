var jstest        = require('jstest').Test,
    theorem       = require('../util/theorem'),
    assertFormula = require('../util/assert_formula')

var specification = require('../../lib/tnt/specification'),
    parser        = require('../../lib/parser')

jstest.describe('specification', function() { with(this) {
  before(function() { with(this) {
    this.t = theorem('Ax: Ay: ((x+y)+c) = ((c+y)+x)')
  }})

  it('removes a for-all quantifier', function() { with(this) {
    assertFormula( 'Ay: ((x+y)+c) = ((c+y)+x)', specification(t) )
  }})

  it('replaces all occurrences of the variable with a constant', function() { with(this) {
    var term = parser.term('SS0')
    assertFormula( 'Ay: ((SS0+y)+c) = ((c+y)+SS0)', specification(t, term) )
  }})

  it('replaces all occurrences of the variable with a new variable', function() { with(this) {
    var term = parser.term('z')
    assertFormula( 'Ay: ((z+y)+c) = ((c+y)+z)', specification(t, term) )
  }})

  it('replaces all occurrences of the variable with a free variable', function() { with(this) {
    var term = parser.term('c')
    assertFormula( 'Ay: ((c+y)+c) = ((c+y)+c)', specification(t, term) )
  }})

  it('rejects replacements containing a quantified variable', function() { with(this) {
    var term = parser.term('(Sy + 0)')
    assertThrows(Error, function() { specification(t, term) })
  }})

  it('rejects non-forall formulas', function() { with(this) {
    assertThrows(Error, function() { specification(theorem('Ex: x=y')) })
  }})
}})
