'use strict';

var analyze = require('../util/analyze');

var transform = function(formula, selected) {
  if (!(formula instanceof Array)) return formula;

  if (formula === selected) {
    if (formula[0] === 'not' && formula[1][0] === 'not')
      return formula[1][1];
    else
      return ['not', ['not', formula]];
  }

  var copy = [];

  for (var i = 0, n = formula.length; i < n; i++)
    copy[i] = transform(formula[i], selected);

  return copy;
};

module.exports = function(theorem, choice) {
  var f        = theorem.formula,
      formulas = analyze(f).formula,
      selected = formulas[choice - 1];

  if (!selected)
    throw new Error('Selected index "' + choice + '" is out of bounds');

  return transform(f, selected);
};
