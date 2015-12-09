'use strict';

var clone = require('./clone');

module.exports = function replace(formula, varname, term) {
  var f = [], g;

  for (var i = 0, n = formula.length; i < n; i++) {
    g = formula[i];

    if (!(g instanceof Array))
      f[i] = g;
    else if (g[0] === 'var' && g[1] === varname)
      f[i] = clone(term);
    else
      f[i] = replace(g, varname, term);
  }
  return f;
};
