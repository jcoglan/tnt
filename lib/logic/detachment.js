'use strict';

var equal   = require('../util/equal'),
    printer = require('../util/printer');

module.exports = function(given, implication) {
  var f = given.formula,
      g = implication.formula,
      h;

  if (f[0] === 'implies' && g[0] !== 'implies') {
    h = f;
    f = g;
    g = h;
  }

  if (g[0] !== 'implies')
    throw new Error('Second formula must be of the form {<$x -> $y>}');

  if (!equal(f, g[1]))
    throw new Error('The left-hand side of {' + printer.show(g) +
                    '} is not the same as {' + printer.show(f) + '}');

  return g[2];
};
