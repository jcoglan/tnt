'use strict';

var AXIOMS = require('../tnt/axioms');

var RULES = {
  joining:        require('../logic/joining'),
  separation:     require('../logic/separation'),
  double_tilde:   require('../logic/double_tilde'),
  fantasy:        require('../logic/fantasy'),
  carry_over:     require('../logic/fantasy'),
  detachment:     require('../logic/detachment'),
  contrapositive: require('../logic/contrapositive'),
  de_morgan:      require('../logic/de_morgan'),
  switcheroo:     require('../logic/switcheroo'),
  generalization: require('../tnt/generalization'),
  specification:  require('../tnt/specification'),
  interchange:    require('../tnt/interchange'),
  existence:      require('../tnt/existence'),
  symmetry:       require('../tnt/symmetry'),
  transitivity:   require('../tnt/transitivity'),
  add_succ:       require('../tnt/add_succ'),
  drop_succ:      require('../tnt/drop_succ'),
  induction:      require('../tnt/induction')
};

var COMMANDS = ['commands', 'ls', 'undo', 'axiom', 'push', 'premise', 'pop']
               .concat(Object.keys(RULES));

var Record  = require('../logic/record'),
    analyze = require('../util/analyze'),
    parser  = require('../parser'),
    printer = require('../util/printer');

var Engine = function() {
  this._record = new Record();
};

Engine.prototype.completeWord = function(word) {
  return COMMANDS.filter(function(command) {
    return command.indexOf(word) === 0;
  });
};

Engine.prototype.sendCommand = function(command) {
  var name = command[0],
      fn   = this['_command_' + name],
      args = command.slice(1);

  if (!fn) throw new Error('Unknown command: "' + name + '"');

  return fn.apply(this, args);
};

Engine.prototype._command_commands = function() {
  return COMMANDS.map(function(c) { return [c] });
};

Engine.prototype._command_ls = function() {
  return this._record.list().map(function(record) {
    var formula = printer.show(record[1].formula),
        depth   = record[0];

    while (depth--) formula = '    ' + formula;
    while (formula.length < 56) formula += ' ';
    return [formula, printer.inspect(record[2])];
  });
};

Engine.prototype._command_undo = function(n) {
  this._record.undo(n);
  return this._command_ls();
};

Engine.prototype._command_axiom = function(n) {
  if (n === undefined) return AXIOMS.map(function(a) { return [a] });

  var axiom = AXIOMS[n - 1];
  if (!axiom) throw new Error('Unknown axiom: ' + n);

  this._record.pushTheorem(axiom, ['axiom', n]);
  return this._command_ls();
};

Engine.prototype._command_push = function() {
  this._record.pushScope();
  return this._command_ls();
};

Engine.prototype._command_premise = function(formula) {
  formula = parser.formula([].join.call(arguments, ''));
  this._record.setPremise(formula, ['premise', printer.show(formula)]);
  return this._command_ls();
};

Engine.prototype._command_pop = function() {
  this._record.popScope();
  return this._command_ls();
};

var unary = function(name) {
  return function(t) {
    var theorem = this._record.findTheorem(t),
        formula = RULES[name](theorem);

    this._record.pushTheorem(formula, [name, t], [theorem]);
    return this._command_ls();
  };
};

var binary = function(name) {
  return function(n, m) {
    var s = this._record.findTheorem(n),
        t = this._record.findTheorem(m);

    var formula = RULES[name](s, t);
    this._record.pushTheorem(formula, [name, n, m], [s, t]);
    return this._command_ls();
  };
};

Engine.prototype._command_joining = binary('joining');

Engine.prototype._command_separation = function(t, choice) {
  var theorem = this._record.findTheorem(t),
      formula = RULES.separation(theorem, choice);

  this._record.pushTheorem(formula, ['separation', t, choice], [theorem]);
  return this._command_ls();
};

Engine.prototype._command_double_tilde = function(t, f) {
  var theorem  = this._record.findTheorem(t),
      formulas = analyze(theorem.formula).formula;

  if (f === undefined)
    return formulas.map(function(f) { return [f] });

  var formula = RULES.double_tilde(theorem, f);
  this._record.pushTheorem(formula, ['double_tilde', t, f], [theorem]);
  return this._command_ls();
};

Engine.prototype._command_fantasy = function(n, m) {
  var s = this._record.findTheorem(n, 1),
      t = this._record.findTheorem(m, 1);

  var formula = RULES.fantasy(s, t);
  this._record.pushTheorem(formula, ['fantasy', n, m], [s, t]);
  return this._command_ls();
};

Engine.prototype._command_carry_over = function(n) {
  var theorem = this._record.findTheorem(n, -1);
  this._record.pushTheorem(theorem.formula, ['carry_over', n], [theorem]);
  return this._command_ls();
};

Engine.prototype._command_detachment = binary('detachment');

Engine.prototype._command_contrapositive = unary('contrapositive');

Engine.prototype._command_de_morgan = unary('de_morgan');

Engine.prototype._command_switcheroo = unary('switcheroo');

Engine.prototype._command_generalization = function(t, varname) {
  var theorem = this._record.findTheorem(t),
      formula = RULES.generalization(theorem, varname);

  this._record.pushTheorem(formula, ['generalization', t, varname], [theorem]);
  return this._command_ls();
};

Engine.prototype._command_specification = function(t, term) {
  var theorem = this._record.findTheorem(t),
      parts   = [].slice.call(arguments, 1),
      term    = parts.length > 0 ? parser.term(parts.join('')) : null,
      formula = RULES.specification(theorem, term),
      record  = ['specification', t];

  if (term) record.push(printer.show(term));
  this._record.pushTheorem(formula, record, [theorem]);
  return this._command_ls();
};

Engine.prototype._command_interchange = unary('interchange');

Engine.prototype._command_existence = function(t, varname, ids) {
  var theorem = this._record.findTheorem(t),
      terms   = analyze(theorem.formula).term,
      ids     = [].slice.call(arguments, 2);

  if (varname === undefined)
    throw new Error('Missing required variable name');

  if (ids.length === 0)
    return terms.map(function(t) { return [t] });

  var formula = RULES.existence(theorem, varname, ids);
  this._record.pushTheorem(formula, ['existence', t, varname].concat(ids), [theorem]);
  return this._command_ls();
};

Engine.prototype._command_symmetry = unary('symmetry');

Engine.prototype._command_transitivity = binary('transitivity');

Engine.prototype._command_add_succ = unary('add_succ');

Engine.prototype._command_drop_succ = unary('drop_succ');

Engine.prototype._command_induction = binary('induction');

module.exports = Engine;
