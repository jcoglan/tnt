'use strict';

var analyze = require('../util/analyze'),
    printer = require('../util/printer'),
    replace = require('../util/replace');

module.exports = function(theorem, term) {
  var f = theorem.formula;

  if (f[0] !== 'forall')
    throw new Error('Formula must be of the form {A$u: $x}');

  if (!term) return f[2];

  var fvars = analyze(f[2]),
      tvars = analyze(term);

  for (var name in tvars.free) {
    if (name in fvars.bound)
      throw new Error('Term contains a free variable {' + name +
                      '} which is quantified in {' + printer.show(f[2]) + '}');
  }

  return replace(f[2], f[1][1], term);
};
