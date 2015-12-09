'use strict';

module.exports = {
  zero: function() {
    return ['zero'];
  },

  variable: function(input, start, end, elements) {
    return ['var', input.charAt(start)];
  },

  meta: function(input, start, end, elements) {
    return ['meta', elements[1].text];
  },

  successor: function(input, start, end, elements) {
    return ['succ', elements[1]];
  },

  sum: function(input, start, end, elements) {
    return ['sum', elements[0].term, elements[2].term];
  },

  product: function(input, start, end, elements) {
    return ['product', elements[0].term, elements[2].term];
  },

  atom: function(input, start, end, elements) {
    return ['eq', elements[0], elements[4]];
  },

  negation: function(input, start, end, elements) {
    return ['not', elements[2]];
  },

  and: function(input, start, end, elements) {
    return ['and', elements[0].formula, elements[2].formula];
  },

  or: function(input, start, end, elements) {
    return ['or', elements[0].formula, elements[2].formula];
  },

  implies: function(input, start, end, elements) {
    return ['implies', elements[0].formula, elements[2].formula];
  },

  exists: function(input, start, end, elements) {
    return ['exists', elements[1].elements[0], elements[1].formula];
  },

  forall: function(input, start, end, elements) {
    return ['forall', elements[1].elements[0], elements[1].formula];
  }
};
