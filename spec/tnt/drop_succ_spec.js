var jstest        = require('jstest').Test,
    theorem       = require('../util/theorem'),
    assertFormula = require('../util/assert_formula')

var drop_succ = require('../../lib/tnt/drop_succ')

jstest.describe('drop_succ', function() { with(this) {
  it('drops S from both sides of an atom', function() { with(this) {
    var t = theorem('Sa = SSb')
    assertFormula( 'a = Sb', drop_succ(t) )
  }})

  it('rejects a non-atom', function() { with(this) {
    assertThrows(Error, function() { drop_succ(theorem('~ a = b')) })
  }})

  it('rejects an atom with no S on one side', function() { with(this) {
    assertThrows(Error, function() { drop_succ(theorem('a = Sb')) })
  }})
}})
