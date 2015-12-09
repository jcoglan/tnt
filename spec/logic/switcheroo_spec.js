var jstest        = require('jstest').Test,
    theorem       = require('../util/theorem'),
    assertFormula = require('../util/assert_formula')

var switcheroo = require('../../lib/logic/switcheroo')

jstest.describe('switcheroo', function() { with(this) {
  it('converts an or into a negative implication', function() { with(this) {
    var t = theorem('<a=b | c=d>')
    assertFormula( '<~a=b -> c=d>', switcheroo(t) )
  }})

  it('converts a negative implication into an or', function() { with(this) {
    var t = theorem('<~a=b -> c=d>')
    assertFormula( '<a=b | c=d>', switcheroo(t) )
  }})

  it('rejects an and', function() { with(this) {
    assertThrows(Error, function() { switcheroo(theorem('<a=b & c=d>')) })
  }})

  it('rejects a positive implication', function() { with(this) {
    assertThrows(Error, function() { switcheroo(theorem('<a=b -> c=d>')) })
  }})
}})
