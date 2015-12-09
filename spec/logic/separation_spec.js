var jstest        = require('jstest').Test,
    theorem       = require('../util/theorem'),
    assertFormula = require('../util/assert_formula')

var separation = require('../../lib/logic/separation')

jstest.describe('separation', function() { with(this) {
  it('extracts the left-hand side of an and', function() { with(this) {
    var t = theorem('<a=b & c=d>')
    assertFormula( 'a=b', separation(t, 1) )
  }})

  it('extracts the right-hand side of an and', function() { with(this) {
    var t = theorem('<a=b & c=d>')
    assertFormula( 'c=d', separation(t, 2) )
  }})

  it('rejects a non-and formula', function() { with(this) {
    assertThrows(Error, function() { separation(theorem('<a=b | c=d>', 1)) })
  }})

  it('rejects an out-of-bounds index', function() { with(this) {
    assertThrows(Error, function() { separation(theorem('<a=b & c=d>', 0)) })
  }})
}})
