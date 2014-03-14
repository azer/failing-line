## failing-line

Return the line number and filename of failing line from given error object

## Install

```bash
$ npm install failing-line
```

## Usage

```js
var failingLine = require('failing-line')

process.on('uncaughtException', function (error) {
  failingLine(error)
  // => { lineno: 8, filename: 'example.js' }
})

hereIfail++
```

If the top line(s) in the stack should be skipped in your case,
pass an extra parameter:

```js
failingLine(error, 1) // will start reading stack from second line
```

Check out `test.js` for more info.
