var jstest        = require('jstest').Test,
    theorem       = require('../util/theorem'),
    assertFormula = require('../util/assert_formula')

var double_tilde = require('../../lib/logic/double_tilde')

jstest.describe('double_tilde', function() { with(this) {
  before(function() { with(this) {
    this.t = theorem('<~ a = b | ~~ c = d>')
  }})

  it('adds two tildes to a positive formula', function() { with(this) {
    assertFormula( '~~ <~ a = b | ~~ c = d>', double_tilde(t, 1) )
  }})

  it('adds two tildes to a negative formula', function() { with(this) {
    assertFormula( '<~~~ a = b | ~~ c = d>', double_tilde(t, 2) )
  }})

  it('removes two tildes from a double-negative formula', function() { with(this) {
    assertFormula( '<~ a = b | c = d>', double_tilde(t, 4) )
  }})

  it('rejects selected formulas that are out of bounds', function() { with(this) {
    assertThrows(Error, function() { double_tilde(t, 7) })
  }})
}})
