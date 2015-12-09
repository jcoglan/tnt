var jstest        = require('jstest').Test,
    theorem       = require('../util/theorem'),
    assertFormula = require('../util/assert_formula')

var de_morgan = require('../../lib/logic/de_morgan')

jstest.describe('de_morgan', function() { with(this) {
  it('converts a negative-or into an and-negative', function() { with(this) {
    var t = theorem('~<a=b | c=d>')
    assertFormula( '<~a=b & ~c=d>', de_morgan(t) )
  }})

  it('converts an and-negative into a negative-or', function() { with(this) {
    var t = theorem('<~a=b & ~c=d>')
    assertFormula( '~<a=b | c=d>', de_morgan(t) )
  }})

  it('rejects a positive-or', function() { with(this) {
    assertThrows(Error, function() { de_morgan(theorem('<a=b | c=d>')) })
  }})

  it('rejects a part-positive-and', function() { with(this) {
    assertThrows(Error, function() { de_morgan(theorem('<~a=b & c=d>')) })
  }})
}})
