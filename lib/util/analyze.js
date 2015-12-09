'use strict';

var parser = require('../parser');

var walk = function(formula, results) {
  if (!(formula instanceof Array)) return;

  var type = formula[0];

  if (type in parser.FORMULA) results.formula.push(formula);
  if (type in parser.TERM)    results.term.push(formula);

  if (type in parser.QUANT) {
    results.bound[formula[1][1]] = true;
    return walk(formula[2], results);
  }

  if (type === 'var') {
    if (!(formula[1] in results.bound || formula[1] in results.free))
      results.free[formula[1]] = true;
  }

  for (var i = 1, n = formula.length; i < n; i++)
    walk(formula[i], results);
};

module.exports = function(formula) {
  var results = {bound: {}, free: {}, formula: [], term: []};
  walk(formula, results);
  return results;
};
