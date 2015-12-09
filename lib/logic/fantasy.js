'use strict';

var derived = function(base, target) {
  if (base === target) return true;

  var derives = target.derives;

  for (var i = 0, n = derives.length; i < n; i++) {
    if (derived(base, derives[i])) return true;
  }
  return false;
};

module.exports = function(x, y) {
  if (x.scope !== y.scope)
    throw new Error('Theorems must come from the same scope');

  if (x !== x.scope.premise)
    throw new Error('First theorem must be a premise');

  if (!derived(x, y))
    throw new Error('Second theorem must be derived from the first');

  return ['implies', x.formula, y.formula];
};
