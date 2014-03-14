var failingLine = require("./");
var test = require("tape");

test('failing line', function (assert) {
  var err = new Error('Hello World');
  var ln = failingLine(err);

  assert.plan(2);
  assert.equal(ln.lineno, 5);
  assert.equal(ln.filename, __filename);
});

test('shifting', function (assert) {
  var err = fail();
  var ln = failingLine(err, 1);

  assert.plan(2);
  assert.equal(ln.lineno, 14);
  assert.equal(ln.filename, __filename);

  function fail () {
    return new Error('yo');
  }
});
