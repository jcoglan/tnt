'use strict';

var equal   = require('../util/equal'),
    replace = require('../util/replace');

module.exports = function(step, base) {
  var f = step.formula,
      g = base.formula;

  if (f[0] !== 'forall' || f[2][0] !== 'implies')
    throw new Error('Step formula must be of the form {A$u: <$x -> $y>}');

  var name = f[1][1],
      lhs  = f[2][1],
      rhs  = replace(lhs, name, ['succ', f[1]]);

  if (!equal(rhs, f[2][2]))
    throw new Error('Step formula must replace {' + name + '} with {S' + name + '}');

  var zero = replace(lhs, name, ['zero']);

  if (!equal(zero, g))
    throw new Error('Base formula must replace {' + name + '} with {0}');

  return ['forall', f[1], lhs];
};
