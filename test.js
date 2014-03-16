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

test('function names with paranthesis', function (assert) {
  var err = { stack: tapeStack.join('\n') };
  var ln = failingLine(err, 2);

  assert.plan(4);
  assert.equal(ln.fn, 'Expect.(anonymous function) [as equal]');
  assert.equal(ln.filename, '/Users/azer/dev/prova/lib/expect.js');
  assert.equal(ln.line, 39);
  assert.equal(ln.col, 29);
});

test('stack lines with only urls and line/column numbers', function (assert) {
  var err = { stack: browserStack.join('\n') };
  var ln = failingLine(err, 3);

  assert.plan(4);
  assert.notOk(ln.fn);
  assert.equal(ln.filename, 'http://localhost:7559/assets/run.js');
  assert.equal(ln.line, 11);
  assert.equal(ln.col, 10);
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

var tapeStack = ["Error: should be equal",
                 "    at Test.assert [as _assert] (/Users/azer/dev/prova/node_modules/tape/lib/test.js:178:54)",
                 "    at Test.equal.Test.equals.Test.isEqual.Test.is.Test.strictEqual.Test.strictEquals (/Users/azer/dev/prova/node_modules/tape/lib/test.js:301:10)",
                 "    at Expect.(anonymous function) [as equal] (/Users/azer/dev/prova/lib/expect.js:39:29)",
                 "    at null._onTimeout (/Users/azer/dev/prova/example.js:10:32)","    at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)"];

var browserStack = [
  "Error: should be equal",
  "    at Test.assert [as _assert] (http://localhost:7559/assets/run.js:5564:54)",
  "    at Test.equal.Test.equals.Test.isEqual.Test.is.Test.strictEqual.Test.strictEquals (http://localhost:7559/assets/run.js:5687:10)",
  "    at Function.expect.(anonymous function) (http://localhost:7559/assets/run.js:175:19)",
  "    at http://localhost:7559/assets/run.js:11:10",
  "    at Test.call [as _cb] (http://localhost:7559/assets/run.js:46:12)",
  "    at Test.run (http://localhost:7559/assets/run.js:5442:14)",
  "    at next (http://localhost:7559/assets/run.js:5259:15)",
  "    at http://localhost:7559/assets/run.js:1902:21"
];
