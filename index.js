module.exports = failingLine;

function failingLine (error) {
  var match = error.stack.match(/\(([^\(\)]+)\)/);
  if (!match) return undefined;

  match = match[1].split(':');

  return {
    filename: match[0],
    lineno: Number(match[1])
  };
}
