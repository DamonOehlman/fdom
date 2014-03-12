/* jshint node: true */

/**
  ### remove(el)

  Remove the specified target element from the DOM.
  
**/
module.exports = function(el) {
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }

  return el;
};