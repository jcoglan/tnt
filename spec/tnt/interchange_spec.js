var jstest        = require('jstest').Test,
    theorem       = require('../util/theorem'),
    assertFormula = require('../util/assert_formula')

var interchange = require('../../lib/tnt/interchange')

jstest.describe('interchange', function() { with(this) {
  it('converts "Ax: ~y" into "~Ex: y"', function() { with(this) {
    var t = theorem('Ax: ~ y=z')
    assertFormula( '~ Ex: y=z', interchange(t) )
  }})

  it('rejects positive for-all clauses', function() { with(this) {
    assertThrows(Error, function() { interchange(theorem('Ax: y=z')) })
  }})

  it('rejects negative for-all formulas', function() { with(this) {
    assertThrows(Error, function() { interchange(theorem('~Ax: ~y=z')) })
  }})

  it('converts "~Ex: y" into "Ax: ~y"', function() { with(this) {
    var t = theorem('~ Ex: y=z')
    assertFormula( 'Ax: ~ y=z', interchange(t) )
  }})

  it('rejects positive exists formulas', function() { with(this) {
    assertThrows(Error, function() { interchange(theorem('Ex: y=z')) })
  }})
}})
