# fdom

A set of DOM utilities, which were first created in
[cog](https://github.com/DamonOehlman/cog) but have been extracted as cog
is more a JS language toolset, and `fdom` is it's DOM counterpart.

As per `cog` it is designed to be used as in a cherry-picking way rather
than by simply requiring `fdom` as a whole module.


[![NPM](https://nodei.co/npm/fdom.png)](https://nodei.co/npm/fdom/)


[![browser support](https://ci.testling.com/DamonOehlman/fdom.png)](https://ci.testling.com/DamonOehlman/fdom)

[![Build Status](https://img.shields.io/travis/DamonOehlman/fdom.svg?branch=master)](https://travis-ci.org/DamonOehlman/fdom) 

## Modules

The following is a list of modules that `fdom` provides. Examples demonstrate
how to `require` and use them in your code.

### append

```js
var append = require('fdom/append');
```

#### append.to(target, => child) => child

Append the specified `child` element to the `target` element using the
familiar `appendChild` method of the target.

```js
var append = require('fdom/append');
var crel = require('crel');

// create a list container, appending it to the document body
var list = append.to(document.body, crel('ul'));

// create items in the list for each of the fruits in the list
['apple', 'banana', 'pear', 'orange']
  .map(function(fruit) {
    return crel('li', fruit)
  })
  .map(append.to(list));

```

### attrib(name, value) => fn(el)

Set an attribute value for an element.

```js
var attrib = require('fdom/attrib');
var qsa = require('fdom/qsa');

// change all elements with a data-name="Fred" to "Bob"
qsa('*[data-name="Fred"]').forEach(attrib('data-name', 'Bob'));

```

### classtweak(operations, => el)

A functional helper for making
[classList](http://www.w3.org/TR/domcore/#dom-element-classlist)
modifications to elements, supporting partial application.

```js
var tweak = require('fdom/classtweak');
var qsa = require('fdom/qsa');

// add a class to the document body
tweak('+test', document.body);

// remove the class
tweak('-test', document.body);

// toggle a class (! operator also works)
tweak('~test', document.body);

// apply an active class to all matching section tags
qsa('section').forEach(tweak('+active'));
```

### css

```
f(el) => fn(valueKeyPair)
```

The `css` function can be used to pass through keys and values that should be
applied to a particular dom element.

```js
var css = require('fdom/css');

[ ['margin', 0], ['backgroundColor', 'red'] ].forEach(css(document.body));

```

### get-attributes

```
f(regex, => el) => { attr1: val, attr2: val }
```

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
var loader = require('fdom/loader');
var scripts = [
  '//cdnjs.cloudflare.com/ajax/libs/ace/1.1.01/ace.js',
  '//cdnjs.cloudflare.com/ajax/libs/chainvas/2.1/chainvas.js'
];

loader(scripts, function() {
  console.log('loaded');
});
```

### meta(regex?)

Find all the `<meta>` tags that have a name attribute and collate as a
simple JS objects whether the content of the tag is the value.

```js
/*
given the following html:

<html>
<head>
<meta name="foo" content="bar">
<meta name="app" content="wonderful">
<meta name="fdom-name" content="fred">
<meta name="fdom-title" content="sir">
</head>
<body>
</body>
</html>
*/

var meta = require('fdom/meta');

// get all the attributes
console.log(meta());
// --> { foo: 'bar', app: 'wonderful', 'fdom-name': 'fred', 'fdom-title': 'sir' }

// get only attributes matching a regex
console.log(meta(/^foo/));
// --> { foo: 'bar' }

// get capture group 1 matched
console.log(meta(/^fdom-(.*)$/));
// --> { name: 'fred', title: 'sir' }
```

### next

```
f(name, el) => fn
```

The `next` function is used to pull event data from `el` for the event
named `name`.  This can be useful when combined with a
[pull-stream](https://github.com/dominictarr/pull-stream) to capture
a stream of events from a DOM elements.

```js
var pull = require('pull-stream');
var next = require('fdom/next');

pull(
  pull.Source(next('keydown', document)),
  pull.log()
);
```

### on

```
f(name, => el, => cb)
```

The `on` helper assists with working with DOM events and being able to map
those to a node callback style function in the form:

```js
function(err, evt) {
}
```

When the event is triggered by the `el` the callback is fired passing
a null value to the `err` argument.

```js
var async = require('async');
var crel = require('crel');
var waitLoad = require('fdom/on')('load');
var scripts = [
  '//cdnjs.cloudflare.com/ajax/libs/ace/1.1.01/ace.js',
  '//cdnjs.cloudflare.com/ajax/libs/chainvas/2.1/chainvas.js'
];

// create the script elements
scripts = scripts.map(function(url) {
  var el = crel('script', { src: url });
  document.body.appendChild(el);

  return el;
})

async.parallel(scripts.map(waitLoad), function(err) {
  console.log('all scripts loaded');
});
```

### qsa(selector, scope?)

This function is used to get the results of the querySelectorAll output
in the fastest possible way.  This code is very much based on the
implementation in
[zepto](https://github.com/madrobby/zepto/blob/master/src/zepto.js#L104),
but perhaps not quite as terse.

```js
var qsa = require('fdom/qsa');
```

### raf(callback)

Request animation frame helper.

```js
var raf = require('fdom/raf');

function animate() {
  console.log('animating');
  raf(animate); // go again
}

raf(animate);
```

### remove(el)

Remove the specified target element from the DOM.

## License(s)

### MIT

Copyright (c) 2014 Damon Oehlman <damon.oehlman@gmail.com>

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
