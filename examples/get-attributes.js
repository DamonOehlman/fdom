/*
imagine we have the following html:

<html>
<body>
<video id="test" rtc-remote="customer" rtc-stream="main"></video>
</body>
</html>
*/

var getAttributes = require('../get-attributes');
var el = document.getElementById('test');

console.log(getAttributes(/^(?:rtc-|data-rtc-|rtc\:)(.*)$/, el));
// --> { remote: 'customer', stream: 'main' }