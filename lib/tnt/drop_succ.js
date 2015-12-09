'use strict';

module.exports = function(theorem) {
  var f = theorem.formula;

  if (f[0] !== 'eq' || f[1][0] !== 'succ' || f[2][0] !== 'succ')
    throw new Error('Formula must be of the form {S$x = S$y}');

  return ['eq', f[1][1], f[2][1]];
};
