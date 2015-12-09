'use strict';

var printer = {
  FORALL:   '\u2200',
  EXISTS:   '\u2203',
  AND:      '\u2227',
  OR:       '\u2228',
  NOT:      '\u223C',
  IMPLIES:  '\u2283',
  PRODUCT:  '\u22C5',
  LANGLE:   '\u27E8',
  RANGLE:   '\u27E9',

  inspect: function(formula) {
    if (!(formula instanceof Array)) return formula;
    return '(' + formula.map(printer.inspect).join(' ') + ')';
  },

  show: function(formula) {
    if (!formula || typeof formula === 'string') return formula;
    return this['_' + formula[0]].apply(this, formula.slice(1));
  },

  _zero: function() {
    return '0';
  },

  _var: function(name) {
    return name;
  },

  _meta: function(name) {
    return name;
  },

  _succ: function(term) {
    return 'S' + printer.show(term);
  },

  _sum: function(x, y) {
    return '(' + printer.show(x) + ' + ' + printer.show(y) + ')';
  },

  _product: function(x, y) {
    return '(' + printer.show(x) + ' ' +
                 printer.PRODUCT + ' ' +
                 printer.show(y) + ')';
  },

  _eq: function(x, y) {
    return printer.show(x) + ' = ' + printer.show(y);
  },

  _not: function(formula) {
    return printer.NOT + ' ' + printer.show(formula);
  },

  _and: function(x, y) {
    return printer.LANGLE + printer.show(x) + ' ' +
           printer.AND + ' ' +
           printer.show(y) + printer.RANGLE;
  },

  _or: function(x, y) {
    return printer.LANGLE + printer.show(x) + ' ' +
           printer.OR + ' ' +
           printer.show(y) + printer.RANGLE;
  },

  _implies: function(x, y) {
    return printer.LANGLE + printer.show(x) + ' ' +
           printer.IMPLIES + ' ' +
           printer.show(y) + printer.RANGLE;
  },

  _exists: function(variable, formula) {
    return printer.EXISTS + printer.show(variable) + ': ' + printer.show(formula);
  },

  _forall: function(variable, formula) {
    return printer.FORALL + printer.show(variable) + ': ' + printer.show(formula);
  }
};

module.exports = printer;
