'use strict';

module.exports = function(theorem) {
  var f = theorem.formula;

  if (f[0] === 'and' && f[1][0] === 'not' && f[2][0] === 'not')
    return ['not', ['or', f[1][1], f[2][1]]];

  if (f[0] === 'not' && f[1][0] === 'or')
    return ['and', ['not', f[1][1]], ['not', f[1][2]]];

  throw new Error('Formula must be of the form {<~ $x & ~ $y>} or {~ <$x | $y>}');
};
