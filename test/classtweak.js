var test = require('tape');
var classtweak = require('../classtweak');
var crel = require('crel');
var el;

test('create a test div', function(t) {
  t.plan(1);
  t.ok(el = crel('div'));
});

test('add a single class', function(t) {
  t.plan(1);
  classtweak('+test', el);
  t.ok(el.classList.contains('test'));
});

test('remove a single class', function(t) {
  t.plan(2);
  t.ok(el.classList.contains('test'));
  classtweak('-test', el);
  t.ok(! el.classList.contains('test'));
});

test('add multiple classes to an element (space delimited)', function(t) {
  t.plan(2);
  classtweak('+foo +bar', el);
  t.ok(el.classList.contains('foo'));
  t.ok(el.classList.contains('bar'));
});

test('remove multiple classes from an element (space delimited)', function(t) {
  t.plan(4);
  t.ok(el.classList.contains('foo'));
  t.ok(el.classList.contains('bar'));
  classtweak('-foo -bar', el);
  t.ok(! el.classList.contains('foo'));
  t.ok(! el.classList.contains('bar'));
});