var attrib = require('../attrib');
var qsa = require('../qsa');

// change all elements with a data-name="Fred" to "Bob"
qsa('*[data-name="Fred"]').forEach(attrib('data-name', 'Bob'));
