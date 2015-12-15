'use strict';

module.exports = function(theorem, choice) {
  var f = theorem.formula;

  if (f[0] !== 'and')
    throw new Error('Formula must be of the form {<$x & $y>}');

  if (choice !== 1 && choice !== 2)
    throw new Error('Separation choice must either by 1 or 2');

  return f[choice];
};
