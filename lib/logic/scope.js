'use strict';

var Scope = function(parent) {
  this.parent  = parent;
  this.premise = null;
};

module.exports = Scope;
