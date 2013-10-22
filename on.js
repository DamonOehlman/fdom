/* jshint node: true */
'use strict';

/**
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

  <<< examples/on.js
**/
module.exports = function(name, el) {
  function bind(t) {
    var trigger;
    var buffered = [];

    t.addEventListener(name, function(evt) {
      if (trigger) {
        trigger(null, evt);
      }
      else {
        buffered[buffered.length] = evt;
      }
    });

    return function(cb) {
      trigger = cb;

      // if we have a buffered results, trigger those now
      if (buffered.length) {
        buffered.splice(0).forEach(function(evt) {
          cb(null, evt);
        });
      }
    };
  }

  return el ? bind(el) : bind;
};