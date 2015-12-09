'use strict';

module.exports = function(theorem) {
  var f = theorem.formula;

  if (f[0] === 'or')
    return ['implies', ['not', f[1]], f[2]];

  if (f[0] === 'implies' && f[1][0] === 'not')
    return ['or', f[1][1], f[2]];

  throw new Error('Formula must be of the form {<$x | $y>} or {<~ $x -> $y>}');
};
