/*
given the following html:

<html>
<head>
<meta name="foo" content="bar">
<meta name="app" content="wonderful">
</head>
<body>
</body>
</html>
*/

console.log(require('../meta')());
// --> { foo: 'bar', app: 'wonderful' }