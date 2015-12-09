'use strict';

var Scope   = require('../logic/scope'),
    Theorem = require('../logic/theorem');

var Record = function() {
  this._theorems = [];
  this._scopes   = [];

  this._scopes.push(new Scope());
};

Record.prototype.list = function() {
  return this._theorems.slice();
};

Record.prototype.undo = function(n) {
  if (n === undefined) n = this._theorems.length - 1;

  this._theorems = this._theorems.slice(0, n);
  this._scopes   = [];

  var scope;

  if (n > 0) {
    scope = this._theorems[n - 1][1].scope;
    while (scope) {
      this._scopes.unshift(scope);
      scope = scope.parent;
    }
  } else {
    this._scopes.push(new Scope());
  }
};

Record.prototype.pushScope = function() {
  this.pushTheorem('[', ['push']);
  this._scopes.push(new Scope(this._currentScope()));
};

Record.prototype.setPremise = function(formula, command) {
  if (this._currentDepth() === 0)
    throw new Error('Cannot set premises in the top-level scope');

  var scope = this._currentScope();

  if (scope.premise)
    throw new Error('Current scope already has a premise defined');

  scope.premise = this.pushTheorem(formula, command);
};

Record.prototype.popScope = function() {
  if (this._currentDepth() === 0)
    throw new Error('Cannot pop out of the top-level scope');

  var scope = this._scopes.pop();
  scope.outcome = this._theorems[this._theorems.length - 1][1];

  this.pushTheorem(']', ['pop']);
};

Record.prototype.pushTheorem = function(formula, command, derives) {
  var theorem = new Theorem(this._currentScope(), formula, derives),
      record  = [this._currentDepth(), theorem, command];

  this._theorems.push(record);
  return theorem;
};

Record.prototype.findTheorem = function(n, level) {
  var theorem = this._theorems[n - 1],
      scope   = this._currentScope();

  if (!theorem) throw new Error('Unknown theorem: ' + n);
  theorem = theorem[1];

  if (level === 1) {
    if (theorem.scope.parent !== scope)
      throw new Error('Theorem ' + n + ' is not from an in-scope fantasy');
  } else if (level === -1) {
    if (theorem.scope !== scope.parent)
      throw new Error('Theorem ' + n + ' is not from the parent scope');
  } else {
    if (theorem.scope !== scope)
      throw new Error('Theorem ' + n + ' is not in scope');
  }

  return theorem;
};

Record.prototype._currentScope = function() {
  return this._scopes[this._currentDepth()];
};

Record.prototype._currentDepth = function() {
  return this._scopes.length - 1;
};

module.exports = Record;
