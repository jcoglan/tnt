'use strict';

module.exports = function equal(x, y) {
  if (x === y) return true;

  if (!(x instanceof Array)) return false;
  if (!(y instanceof Array)) return false;
  if (x.length !== y.length) return false;

  for (var i = 0, n = x.length; i < n; i++) {
    if (!equal(x[i], y[i])) return false;
  }
  return true;
};
