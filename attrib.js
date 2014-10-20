/**
  ### attrib(name, value) => fn(el)

  Set an attribute value for an element.

  <<< examples/attrib.js

**/
module.exports = function(name, value) {
  return function(el) {
    el.setAttribute(name, value);
  };
};
