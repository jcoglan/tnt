'use strict';

module.exports = function clone(expr) {
  if (!(expr instanceof Array)) return expr;

  var copy = [];

  for (var i = 0, n = expr.length; i < n; i++)
    copy[i] = clone(expr[i]);

  return copy;
};
