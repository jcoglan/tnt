var jstest        = require('jstest').Test,
    theorem       = require('../util/theorem'),
    assertFormula = require('../util/assert_formula')

var detachment = require('../../lib/logic/detachment')

jstest.describe('detachment', function() { with(this) {
  it('extracts the right-hand-side of an implication if given the left-hand side', function() { with(this) {
    var s = theorem('a=b'),
        t = theorem('<a=b -> c=d>')

    assertFormula( 'c=d', detachment(s, t) )
  }})

  it('rejects a non-implication', function() { with(this) {
    var s = theorem('a=b'),
        t = theorem('<a=b & c=d>')

    assertThrows(Error, function() { detachment(s, t) })
  }})

  it('rejects a detachment where the left-hand side does not match', function() { with(this) {
    var s = theorem('a=b'),
        t = theorem('<a=x -> c=d>')

    assertThrows(Error, function() { detachment(s, t) })
  }})

}})
