/* jshint node: true */
'use strict';

/**
  ### append

  ```js
  var append = require('fdom/append');
  ```
**/

var append = module.exports = function() {
  console.log('not yet implemented');

  return false;
};

/**
  #### append.to(target, => child) => child

  Append the specified `child` element to the `target` element using the
  familiar `appendChild` method of the target.

  <<< examples/append-to.js

**/

append.to = function(target, child) {

  function append(el) {
    var t = target;
    if (typeof t == 'string' || (t instanceof String)) {
      t = document.querySelector(t);
    }

    if (t && typeof t.appendChild == 'function') {
      t.appendChild(el);
      return el;
    }
  }

  return child ? append(child) : append;
};
