/* jshint node: true */
'use strict';

/**
  ### get-attributes

  ```
  f(regex, => el) => { attr1: val, attr2: val }
  ```

  This is a simple but useful attribute extractor that can be used to pull
  attributes that match a particular pattern from an element. The primary
  use case is around custom attributes (such as those used in
  [AngularJS](http://angularjs.org/)) but could also be used to extract
  your own `dataset` attribute collection from an element.

  <<< examples/get-attributes.js
**/
module.exports = function(regex, el) {

  function extract(target) {
    var match;
    var data = {};
    var attr;

    // iterate through the attributes
    for (var ii = 0, count = target.attributes.length; ii < count; ii++) {
      attr = target.attributes[ii];
      match = regex.exec(attr.name);
      if (match) {
        data[match[1] || match[0]] = attr.value;
      }
    }

    return data;
  }

  return el ? extract(el) : extract;
};