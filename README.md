# dd

A set of DOM utilities, which were first created in
[cog](https://github.com/DamonOehlman/cog) but have been extracted as cog
is more a JS language toolset, and `dd` is it's DOM counterpart.

As per `cog` it is designed to be used as in a cherry-picking way rather
than by simply requiring `dd` as a whole module.

## dd/qsa

```js
var qsa = require('dd/qsa');
```

### qsa(selector, scope?)

This function is used to get the results of the querySelectorAll output
in the fastest possible way.  This code is very much based on the
implementation in
[zepto](https://github.com/madrobby/zepto/blob/master/src/zepto.js#L104),
but perhaps not quite as terse.
