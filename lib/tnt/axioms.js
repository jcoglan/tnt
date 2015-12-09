var parser = require('../parser');

module.exports = [
  'Aa: ~ Sa = 0',
  'Aa: (a + 0) = a',
  'Aa: Ab: (a + Sb) = S(a + b)',
  'Aa: (a * 0) = 0',
  'Aa: Ab: (a * Sb) = ((a * b) + a)'
]
.map(parser.formula);
