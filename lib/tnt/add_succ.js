'use strict';

module.exports = function(theorem) {
  var f = theorem.formula;

  if (f[0] !== 'eq')
    throw new Error('Formula must be of the form {$x = $y}');

  return ['eq', ['succ', f[1]], ['succ', f[2]]];
};
