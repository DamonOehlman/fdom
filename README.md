# dd

A set of DOM utilities, which were first created in
[cog](https://github.com/DamonOehlman/cog) but have been extracted as cog
is more a JS language toolset, and `dd` is it's DOM counterpart.

As per `cog` it is designed to be used as in a cherry-picking way rather
than by simply requiring `dd` as a whole module.


[![NPM](https://nodei.co/npm/dd.png)](https://nodei.co/npm/dd/)


## Modules

The following is a list of modules that `dd` provides. Examples demonstrate
how to `require` and use them in your code.

### get-attributes

`(regex, => el) => {}`

This is a simple but useful attribute extractor that can be used to pull
attributes that match a particular pattern from an element. The primary
use case is around custom attributes (such as those used in
[AngularJS](http://angularjs.org/)) but could also be used to extract
your own `dataset` attribute collection from an element.

```js
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
```

### loader(urls, opts?, callback)

This is a simple script loader that will load the urls specified
and trigger the callback once all those scripts have been loaded (or
loading has failed in one instance).

```js
var loader = require('dd/loader');
var scripts = [
  '//cdnjs.cloudflare.com/ajax/libs/ace/1.1.01/ace.js',
  '//cdnjs.cloudflare.com/ajax/libs/chainvas/2.1/chainvas.js'
];

loader(scripts, function() {
  console.log('loaded');
});
```

### qsa(selector, scope?)

This function is used to get the results of the querySelectorAll output
in the fastest possible way.  This code is very much based on the
implementation in
[zepto](https://github.com/madrobby/zepto/blob/master/src/zepto.js#L104),
but perhaps not quite as terse.

```js
var qsa = require('dd/qsa');
```

### raf(callback)

Request animation frame helper.

```js
var raf = require('dd/raf');

function animate() {
  console.log('animating');
  raf(animate); // go again
}

raf(animate);
```

## License(s)

### MIT

Copyright (c) 2013 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
