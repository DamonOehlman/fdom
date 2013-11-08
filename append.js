/* jshint node: true */
'use strict';

/**
  ### append

  ```js
  var append = require('dd/append');
  ```

  #### append.to(target, => child) => child

  Append the specified `child` element to the `target` element using the
  familiar `appendChild` method of the target.

  <<< examples/append-to.js

**/

exports.to = function(target, child) {

  function append(el) {
    target.appendChild(el);

    return el;
  }

  return child ? append(child) : append;
};