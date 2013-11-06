/* jshint node: true */
'use strict';

var reDelim = /[\s\,]\s*/;
var opMappings = {
  '+': 'add',
  '-': 'remove',
  '~': 'toggle',
  '!': 'toggle'
};

/**
  ### classtweak(operations, => el)

  A functional helper for making
  [classList](http://www.w3.org/TR/domcore/#dom-element-classlist)
  modifications to elements, supporting partial application.

  <<< examples/classtweak.js

**/
module.exports = function(mods, element) {
  var rules = mods.trim().split(reDelim)
    // create the rule objects
    .map(function(rule) {
      return {
        op: opMappings[rule.charAt(0)],
        cls: rule.slice(1)
      };
    })
    // removed non mapped operation codes
    .filter(function(rule) {
      return rule.op;
    });

  function tweak(el) {
    if (! el.classList) {
      return el;
    }

    // iterate through the rules and apply the changes
    rules.forEach(function(rule) {
      el.classList[rule.op](rule.cls);
    });

    return el;
  }

  return element ? tweak(element) : tweak;
};