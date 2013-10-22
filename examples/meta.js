/*
given the following html:

<html>
<head>
<meta name="foo" content="bar">
<meta name="app" content="wonderful">
<meta name="dd-name" content="fred">
<meta name="dd-title" content="sir">
</head>
<body>
</body>
</html>
*/

var meta = require('../meta');

// get all the attributes
console.log(meta());
// --> { foo: 'bar', app: 'wonderful', 'dd-name': 'fred', 'dd-title': 'sir' }

// get only attributes matching a regex
console.log(meta(/^foo/));
// --> { foo: 'bar' }

// get capture group 1 matched
console.log(meta(/^dd-(.*)$/));
// --> { name: 'fred', title: 'sir' }