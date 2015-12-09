'use strict';

module.exports = function(theorem) {
  var f = theorem.formula;

  if (f[0] === 'forall' && f[2][0] === 'not')
    return ['not', ['exists', f[1], f[2][1]]];

  if (f[0] === 'not' && f[1][0] === 'exists')
    return ['forall', f[1][1], ['not', f[1][2]]];

  throw new Error('Formula must be of the form {A$u: ~ $x} or {~ E$u: $x}');
};
