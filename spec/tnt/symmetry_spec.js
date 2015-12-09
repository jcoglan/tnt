var jstest        = require('jstest').Test,
    theorem       = require('../util/theorem'),
    assertFormula = require('../util/assert_formula')

var symmetry = require('../../lib/tnt/symmetry')

jstest.describe('symmetry', function() { with(this) {
  it('flips the sides of an atom', function() { with(this) {
    var t = theorem('a = b')
    assertFormula( 'b = a', symmetry(t) )
  }})

  it('rejects a non-atom', function() { with(this) {
    assertThrows(Error, function() { symmetry(theorem('~ a = b')) })
  }})
}})
