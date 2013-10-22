/* jshint node: true */
'use strict';

/**
  ### next

  ```
  f(name, el) => fn
  ```

  The `next` function is used to pull event data from `el` for the event
  named `name`.  This can be useful when combined with a
  [pull-stream](https://github.com/dominictarr/pull-stream) to capture
  a stream of events from a DOM elements.

  <<< examples/next.js
**/
module.exports = function(name, el) {
  var buffer = [];
  var queued = [];

  function handleEvent(evt) {
    queued.length ? queued.shift()(null, evt) : buffer[buffer.length] = evt;
  }

  // add the event listener to the object
  el.addEventListener(name, handleEvent);

  return function(end, cb) {
    // handle the non pull-stream case of a single argument
    if (typeof end == 'function') {
      cb = end;
      end = false;
    }

    // if we are ending the stream, then remove the listener
    if (end) {
      el.removeEventListener(name, handleEvent);
      return cb ? cb(end) : null;
    }

    if (buffer.length > 0) {
      return cb(null, buffer.shift());
    }

    // otherwise, save the cb
    queued[queued.length] = cb;
  };
};
