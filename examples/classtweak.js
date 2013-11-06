var tweak = require('../classtweak');
var qsa = require('../qsa');

// add a class to the document body
tweak('+test', document.body);

// remove the class
tweak('-test', document.body);

// toggle a class (! operator also works)
tweak('~test', document.body);

// apply an active class to all matching section tags
qsa('section').forEach(tweak('+active'));