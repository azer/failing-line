var failingLine = require("./");
var test = require("tape");

test('failing line', function (assert) {
  var err = new Error('Hello World');
  var ln = failingLine(err);

  assert.equal(ln.lineno, 5);
  assert.equal(ln.filename, __filename);
  assert.end();
});
