var formula = require('./formula'),
    term    = require('./term'),
    actions = require('./actions');

var set = function(list) {
  var object = {}, n = list.length;
  while (n--) object[list[n]] = true;
  return object;
};

module.exports = {
  FORMULA:  set(['meta', 'eq', 'not', 'and', 'or', 'implies', 'exists', 'forall']),
  TERM:     set(['meta', 'zero', 'var', 'succ', 'sum', 'product']),
  QUANT:    set(['exists', 'forall']),

  formula: function(string) {
    return formula.parse(string, {actions: actions});
  },

  term: function(string) {
    return term.parse(string, {actions: actions});
  }
};
