'use strict';

var readline = require('readline'),
    parser   = require('../parser'),
    printer  = require('../util/printer'),
    Engine   = require('./engine');

var REPL = function(stdin, stdout) {
  this._stdin  = stdin;
  this._stdout = stdout;
};

REPL.prototype.run = function() {
  var self = this;

  this._engine = new Engine();

  this._readline = readline.createInterface({
    input:      this._stdin,
    output:     this._stdout,
    completer:  function(line) { return self._complete(line) }
  });

  this._readline.on('line', function(line) {
    self._handle(line);
  });

  this._readline.setPrompt('> ');
  this._readline.prompt();
};

REPL.prototype._complete = function(line) {
  var word = this._parse(line).pop();
  return [this._engine.completeWord(word), word];
};

REPL.prototype._handle = function(line) {
  try {
    this._print(this._engine.sendCommand(this._parse(line)));
  } catch (error) {
    var msg = error.message.replace(/\{(.*?)\}/, function(m, a) {
      var parsed;
      try { parsed = parser.formula(a) } catch (e) { parsed = parser.term(a) }
      return '{' + printer.show(parsed) + '}';
    });
    console.log('! ' + msg);
    console.log();
  }
  this._readline.prompt();
};

REPL.prototype._parse = function(line) {
  var words = line.split(/ +/).filter(function(s) { return s !== '' });

  return words.map(function(word) {
    return /^\d+$/.test(word) ? parseInt(word, 10) : word;
  });
};

REPL.prototype._print = function(results) {
  console.log('');

  var i, n;

  if (results.length === 0) {
    console.log('(empty)');
  } else {
    for (i = 0, n = results.length; i < n; i++)
      console.log(this._format([i + 1].concat(results[i])));
  }
  console.log('');
};

REPL.prototype._format = function(result) {
  var line = [], item;

  for (var i = 0, n = result.length; i < n; i++) {
    item = result[i];
    if (typeof item === 'number') {
      item = item.toString();
      while (item.length < 6) item = ' ' + item;
    } else if (item instanceof Array) {
      item = printer.show(item);
    }
    line.push(item);
  }
  return line.join('    ');
};

REPL.run = function(stdin, stdout) {
  new REPL(stdin, stdout).run();
};

module.exports = REPL;
