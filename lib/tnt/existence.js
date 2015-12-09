'use strict';

var analyze = require('../util/analyze'),
    equal   = require('../util/equal'),
    parser  = require('../parser'),
    printer = require('../util/printer');

var replace = function(formula, terms, varname) {
  if (!(formula instanceof Array)) return formula;

  if (terms.indexOf(formula) >= 0) return ['var', varname];

  var copy = [];

  for (var i = 0, n = formula.length; i < n; i++)
    copy[i] = replace(formula[i], terms, varname);

  return copy;
};

module.exports = function(theorem, varname, ids) {
  var f     = theorem.formula,
      o     = analyze(f),
      terms = [],
      i, n, id, term, v;

  try { v = parser.term(String(varname)) } catch (e) {}
  if (!v || v[0] !== 'var') throw new Error('Invalid variable name: ' + varname);

  if (varname in o.bound || varname in o.free)
    throw new Error('Variable {' + varname + '} already appears in {' + printer.show(f) + '}');

  for (i = 0, n = ids.length; i < n; i++) {
    id   = ids[i];
    term = o.term[id - 1];

    if (!term)
      throw new Error('Selected index "' + id + '" is out of bounds');
    
    for (v in analyze(term).free) {
      if (v in o.bound)
        throw new Error('Cannot replace term {' + printer.show(term) +
                        '} containing quantified variable {' + v + '}');
    }

    terms.push(term);

    if (i > 0 && !equal(terms[0], term))
      throw new Error('Selected terms {' + printer.show(terms[0]) +
                      '} and {' + printer.show(term) + '} are not equal');
  }

  return ['exists', ['var', varname], replace(f, terms, varname)];
};
