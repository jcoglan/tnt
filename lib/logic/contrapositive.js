'use strict';

module.exports = function(theorem) {
  var f = theorem.formula;

  if (f[0] !== 'implies')
    throw new Error('Formula must be of the form {<$x -> $y>}');

  if (f[1][0] === 'not' && f[2][0] === 'not')
    return ['implies', f[2][1], f[1][1]];
  else
    return ['implies', ['not', f[2]], ['not', f[1]]];
};
