var jstest        = require('jstest').Test,
    theorem       = require('../util/theorem'),
    assertFormula = require('../util/assert_formula')

var contrapositive = require('../../lib/logic/contrapositive')

jstest.describe('contrapositive', function() { with(this) {
  it('negates and flips an implication', function() { with(this) {
    var t = theorem('<a=b -> c=d>')
    assertFormula( '<~c=d -> ~a=b>', contrapositive(t) )
  }})

  it('double-negates a left-negative implication', function() { with(this) {
    var t = theorem('<~a=b -> c=d>')
    assertFormula( '<~c=d -> ~~a=b>', contrapositive(t) )
  }})

  it('double-negates a right-negative implication', function() { with(this) {
    var t = theorem('<a=b -> ~c=d>')
    assertFormula( '<~~c=d -> ~a=b>', contrapositive(t) )
  }})

  it('un-negates a negative implication', function() { with(this) {
    var t = theorem('<~a=b -> ~c=d>')
    assertFormula( '<c=d -> a=b>', contrapositive(t) )
  }})

  it('rejects a non-implication formula', function() { with(this) {
    assertThrows(Error, function() { contrapositive(theorem('a=b')) })
  }})
}})
