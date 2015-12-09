'use strict';

var analyze = require('../util/analyze'),
    parser  = require('../parser'),
    printer = require('../util/printer');

module.exports = function(theorem, varname) {
  var f       = theorem.formula,
      premise = theorem.scope.premise,
      tFree   = analyze(f).free,
      sFree   = premise ? analyze(premise.formula).free : {},
      v;

  try { v = parser.term(String(varname)) } catch (e) {}
  if (!v || v[0] !== 'var') throw new Error('Invalid variable name: ' + varname);

  if (!(varname in tFree))
    throw new Error('Variable {' + varname + '} does not appear free in {' + printer.show(f) + '}');

  if (varname in sFree)
    throw new Error('Variable {' + varname + '} appears free in the current premise');

  return ['forall', ['var', varname], f];
};
