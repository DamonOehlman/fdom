var append = require('../append');
var test = require('tape');
var crel = require('crel');
var testDiv;

test('create a test div', function(t) {
  t.plan(1);
  t.ok(testDiv = crel('div'));
});

test('add the test div to the document body', function(t) {
  t.plan(2);
  t.equal(append.to(document.body, testDiv), testDiv, 'append returned added element');
  t.equal(testDiv.parentNode, document.body, 'test div added to body');
});

test('append.to supports partial execution', function(t) {
  t.plan(1);
  t.equal(typeof append.to(document.body), 'function');
});