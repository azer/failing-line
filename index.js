var find = require("findall");

module.exports = failingLine;

function failingLine (error, shift) {
  var match = find(error.stack, /\(([^\(\)]+)\)/g);
  if (!match) return undefined;

  match = match[0 + (shift || 0)].split(':');

  return {
    filename: match[0],
    lineno: Number(match[1])
  };
}
