var failingLine = require("./");
var test = require("tape");

test('failing line', function (assert) {
  var err = new Error('Hello World');
  var ln = failingLine(err);

  assert.plan(4);
  assert.equal(ln.line, 5);
  assert.equal(ln.filename, __filename);
  assert.equal(ln.col, 13);
  assert.equal(ln.fn, 'Test._cb');
});

test('shifting', function (assert) {
  var err = fail();
  var ln = failingLine(err, 1);

  assert.plan(4);
  assert.equal(ln.line, 16);
  assert.equal(ln.filename, __filename);
  assert.equal(ln.col, 13);
  assert.ok(ln.fn);

  function fail () {
    return new Error('yo');
  }
});

test('stack with no filenames', function (assert) {
  var err = { stack: replStack.join('\n') };
  var ln = failingLine(err);

  assert.plan(4);
  assert.notOk(ln.fn);
  assert.equal(ln.filename, 'repl');
  assert.equal(ln.line, 1);
  assert.equal(ln.col, 17);

});

var replStack = ["Error: fooo",
  "    at repl:1:17",
  "    at REPLServer.self.eval (repl.js:110:21)",
  "    at Interface.<anonymous> (repl.js:239:12)",
  "    at Interface.EventEmitter.emit (events.js:95:17)",
  "    at Interface._onLine (readline.js:202:10)",
  "    at Interface._line (readline.js:531:8)",
  "    at Interface._ttyWrite (readline.js:760:14)",
  "    at ReadStream.onkeypress (readline.js:99:10)",
  "    at ReadStream.EventEmitter.emit (events.js:98:17)",
  "    at emitKey (readline.js:1095:12)"];
