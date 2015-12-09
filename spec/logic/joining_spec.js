var jstest        = require('jstest').Test,
    theorem       = require('../util/theorem'),
    assertFormula = require('../util/assert_formula')

var joining = require('../../lib/logic/joining')

jstest.describe('joining', function() { with(this) {
  it('combines two formulas into an and', function() { with(this) {
    var s = theorem('a=b'), t = theorem('c=d')
    assertFormula( '<a=b & c=d>', joining(s, t) )
  }})
}})
