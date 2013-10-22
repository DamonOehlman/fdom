# dd

A set of DOM utilities, which were first created in
[cog](https://github.com/DamonOehlman/cog) but have been extracted as cog
is more a JS language toolset, and `dd` is it's DOM counterpart.

As per `cog` it is designed to be used as in a cherry-picking way rather
than by simply requiring `dd` as a whole module.

## Modules

The following is a list of modules that `dd` provides. Examples demonstrate
how to `require` and use them in your code.

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
