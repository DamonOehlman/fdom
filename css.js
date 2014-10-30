/**
  ### css

  ```
  f(el) => fn(valueKeyPair)
  ```

  The `css` function can be used to pass through keys and values that should be
  applied to a particular dom element.

  <<< examples/css.js
**/
module.exports = function(el) {
  var style = el.style;

  return function(vk) {
    var key = vk[0];
    if (typeof style[key] != 'undefined') {
      style[key] = vk[1];
    }

    return style[key];
  };
};
