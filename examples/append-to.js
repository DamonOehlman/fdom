var append = require('../append');
var crel = require('crel');

// create a list container, appending it to the document body
var list = append.to(document.body, crel('ul'));

// create items in the list for each of the fruits in the list
['apple', 'banana', 'pear', 'orange']
  .map(function(fruit) {
    return crel('li', fruit)
  })
  .map(append.to(list));
