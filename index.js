module.exports = failingLine;

function failingLine (error, shift) {
  if (!error || !error.stack) return;

  var index = 1;
  if (shift) index += shift;

  var fn, filename, line, col;
  var stack = error.stack.split('\n')[index];
  var match = stack.match(/at ([\(\)\w\.<>\[\]\s]+) \(([^:]+):(\d+):(\d+)/);

  if (!match) {
    match = stack.match(/at ([^:]+):(\d+):(\d+)/);
    if (!match) return undefined;

    filename = match[1];
    line = Number(match[2]);
    col = Number(match[3]);
  } else {
    fn = match[1];
    filename = match[2];
    line = Number(match[3]);
    col = Number(match[4]);
  }

  return {
    fn: fn,
    filename: filename,
    line: line,
    col: col
  };
}
