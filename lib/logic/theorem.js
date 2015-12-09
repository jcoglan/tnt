'use strict';

var Theorem = function(scope, formula, derives) {
  this.scope   = scope;
  this.formula = formula;
  this.derives = derives || [];
};

module.exports = Theorem;
