'use strict';

var expand = function(derives, theorem) {
  derives = derives.concat(theorem.derives);

  for (var i = 0, n = theorem.derives.length; i < n; i ++)
    derives = expand(derives, theorem.derives[i]);

  return derives;
};

module.exports = function(x, y) {
  if (x.scope !== y.scope)
    throw new Error('Theorems must come from the same scope');

  if (x !== x.scope.premise)
    throw new Error('First theorem must be a premise');

  var derives = expand([], y);
  if (derives.indexOf(x) < 0)
    throw new Error('Second theorem must be derived from the first');

  return ['implies', x.formula, y.formula];
};
