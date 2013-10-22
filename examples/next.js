var pull = require('pull-stream');
var next = require('../next');

pull(
  pull.Source(next('keydown', document)),
  pull.log()
);