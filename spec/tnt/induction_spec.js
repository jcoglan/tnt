var jstest        = require('jstest').Test,
    theorem       = require('../util/theorem'),
    assertFormula = require('../util/assert_formula')

var induction = require('../../lib/tnt/induction')

jstest.describe('induction', function() { with(this) {
  it('combines an induction step and a base case', function() { with(this) {
    var step = theorem('Ax: <(a + x) = (x + a) -> (a + Sx) = (Sx + a)>'),
        base = theorem('(a + 0) = (0 + a)')

    assertFormula( 'Ax: (a + x) = (x + a)', induction(step, base) )
  }})

  it('rejects non-forall steps', function() { with(this) {
    var step = theorem('Ex: <(a + x) = (x + a) -> (a + Sx) = (Sx + a)>'),
        base = theorem('(a + 0) = (0 + a)')

    assertThrows(Error, function() { induction(step, base) })
  }})

  it('rejects non-implication steps', function() { with(this) {
    var step = theorem('Ax: <(a + x) = (x + a) | (a + Sx) = (Sx + a)>'),
        base = theorem('(a + 0) = (0 + a)')

    assertThrows(Error, function() { induction(step, base) })
  }})

  it('rejects non-inductive steps', function() { with(this) {
    var step = theorem('Ax: <(a + x) = (x + a) -> (a + Sx) = (x + a)>'),
        base = theorem('(a + 0) = (0 + a)')

    assertThrows(Error, function() { induction(step, base) })
  }})

  it('rejects invalid base cases', function() { with(this) {
    var step = theorem('Ax: <(a + x) = (x + a) -> (a + Sx) = (Sx + a)>'),
        base = theorem('(a + 0) = (x + a)')

    assertThrows(Error, function() { induction(step, base) })
  }})
}})
