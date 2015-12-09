var jstest        = require('jstest').Test,
    theorem       = require('../util/theorem'),
    assertFormula = require('../util/assert_formula'),
    analyze       = require('../../lib/util/analyze')

var existence = require('../../lib/tnt/existence')

jstest.describe('existence', function() { with(this) {
  describe('with constants', function() { with(this) {
    before(function() { with(this) {
      this.t = theorem('(SS0 + S0) = (S0 + SS0)')
    }})

    it('replaces the first occurrence of a term with a variable', function() { with(this) {
      assertFormula( 'Ea: (Sa + S0) = (S0 + SS0)', existence(t, 'a', [3]) )
    }})

    it('replaces other occurrences of the term', function() { with(this) {
      assertFormula( 'Ea: (SS0 + a) = (S0 + SS0)', existence(t, 'a', [5]) )
      assertFormula( 'Ea: (SS0 + S0) = (a + SS0)', existence(t, 'a', [8]) )
      assertFormula( 'Ea: (SS0 + S0) = (S0 + Sa)', existence(t, 'a', [11]) )
    }})

    it('replaces multiple occurrences of the same term', function() { with(this) {
      assertFormula( 'Ea: (SS0 + a) = (a + SS0)', existence(t, 'a', [5, 8]) )
      assertFormula( 'Ea: (Sa + S0) = (S0 + Sa)', existence(t, 'a', [3, 11]) )
      assertFormula( 'Eb: (b + S0) = (S0 + b)',   existence(t, 'b', [2, 10]) )
    }})

    it('rejects selected terms that are not equal', function() { with(this) {
      assertThrows(Error, function() { existence(t, 'a', [2, 5]) })
    }})

    it('rejects selected terms that are out of bounds', function() { with(this) {
      assertThrows(Error, function() { existence(t, 'a', [20]) })
    }})

    it('rejects invalid variable names', function() { with(this) {
      assertThrows(Error, function() { existence(t, 'A', [5]) })
    }})
  }})

  describe('with variables', function() { with(this) {
    before(function() { with(this) {
      this.t = theorem('Ax: (SSy + Sx) = (Sy + SSx)')
    }})

    it('replaces same terms containing free variables', function() { with(this) {
      assertFormula( 'Ez: Ax: (  z + Sx) = (Sy + SSx)', existence(t, 'z', [2]) )
      assertFormula( 'Ez: Ax: ( Sz + Sx) = (Sy + SSx)', existence(t, 'z', [3]) )
      assertFormula( 'Ez: Ax: (SSz + Sx) = (Sy + SSx)', existence(t, 'z', [4]) )

      assertFormula( 'Ez: Ax: ( Sz + Sx) = ( z + SSx)', existence(t, 'z', [3, 8]) )
      assertFormula( 'Ez: Ax: (SSz + Sx) = (Sz + SSx)', existence(t, 'z', [4, 9]) )
    }})

    it('rejects selected variable terms that are not equal', function() { with(this) {
      assertThrows(Error, function() { existence(t, 'z', [3, 9]) })
    }})

    it('rejects selected terms containing quantified variables', function() { with(this) {
      var s = analyze(t.formula).term,
          k = [0, 4, 5, 6, 9, 10, 11]

      for (var i = 0, n = k.length; i < n; i++) {
        assert( 'x' in analyze(s[k[i]]).free )
        assertThrows(Error, function() { existence(t, 'z', [k[i] + 1]) })
      }
    }})

    it('rejects replacement variables that already appear in formula', function() { with(this) {
      assertThrows(Error, function() { existence(t, 'x', [3]) })
      assertThrows(Error, function() { existence(t, 'y', [3]) })
    }})
  }})
}})
