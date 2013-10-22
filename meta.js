/* jshint node: true */
'use strict';

var qsa = require('./qsa');

/**
  ### meta(scope?)

  Find all the `<meta>` tags that have a name attribute and collate as a
  simple JS objects whether the content of the tag is the value.

  <<< examples/meta.js

**/
module.exports = function(scope) {
  var data = {};

  // find all the meta tags with a name and extract the content
  qsa('meta[name]', scope).forEach(function(tag) {
    data[tag.getAttribute('name')] = tag.getAttribute('content') || '';
  });

  return data;
};