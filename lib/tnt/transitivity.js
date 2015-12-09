'use strict';

var equal   = require('../util/equal'),
    printer = require('../util/printer');

module.exports = function(x, y) {
  var f = x.formula,
      g = y.formula;

  if (f[0] !== 'eq' || g[0] !== 'eq')
    throw new Error('Both formulae must be of the form {$x = $y}');

  if (!equal(f[2], g[1]))
    throw new Error('{' + printer.show(f[2]) + '} and {' + printer.show(g[1]) +
                    '} are different formulae');

  return ['eq', f[1], g[2]];
};
