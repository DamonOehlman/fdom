var test = require('tape');
var classtweak = require('../classtweak');
var qsa = require('../qsa');
var crel = require('crel');
var el;
var el2;

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

test('toggle a single class (set)', function(t) {
  t.plan(2);
  t.ok(! el.classList.contains('test'));
  classtweak('~test', el);
  t.ok(el.classList.contains('test'));
});

test('toggle a single class (unset)', function(t) {
  t.plan(2);
  t.ok(el.classList.contains('test'));
  classtweak('~test', el);
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

test('toggle multiple classes (set, space delimited)', function(t) {
  t.plan(4);
  t.ok(! el.classList.contains('foo'));
  t.ok(! el.classList.contains('bar'));
  classtweak('~foo ~bar', el);
  t.ok(el.classList.contains('foo'));
  t.ok(el.classList.contains('bar'));
});

test('toggle multiple classes (unset, space delimited)', function(t) {
  t.plan(4);
  t.ok(el.classList.contains('foo'));
  t.ok(el.classList.contains('bar'));
  classtweak('~foo ~bar', el);
  t.ok(! el.classList.contains('foo'));
  t.ok(! el.classList.contains('bar'));
});

test('add multiple classes to an element (comma delimited)', function(t) {
  t.plan(2);
  classtweak('+foo,+bar', el);
  t.ok(el.classList.contains('foo'));
  t.ok(el.classList.contains('bar'));
});

test('remove multiple classes from an element (comma delimited)', function(t) {
  t.plan(4);
  t.ok(el.classList.contains('foo'));
  t.ok(el.classList.contains('bar'));
  classtweak('-foo,-bar', el);
  t.ok(! el.classList.contains('foo'));
  t.ok(! el.classList.contains('bar'));
});

test('toggle multiple classes (set, comma delimited)', function(t) {
  t.plan(4);
  t.ok(! el.classList.contains('foo'));
  t.ok(! el.classList.contains('bar'));
  classtweak('~foo,~bar', el);
  t.ok(el.classList.contains('foo'));
  t.ok(el.classList.contains('bar'));
});

test('toggle multiple classes (unset, comma delimited)', function(t) {
  t.plan(4);
  t.ok(el.classList.contains('foo'));
  t.ok(el.classList.contains('bar'));
  classtweak('~foo,~bar', el);
  t.ok(! el.classList.contains('foo'));
  t.ok(! el.classList.contains('bar'));
});

test('partial execution', function(t) {
  t.plan(1);
  t.ok(typeof classtweak('+test') == 'function');
});

test('create another div', function(t) {
  t.plan(1);
  t.ok(el2 = crel('div'));
});

test('add test elements to the doc', function(t) {
  t.plan(2);
  [el, el2].forEach(function(el) {
    document.body.appendChild(el);
  });

  t.ok(el.parentNode);
  t.ok(el2.parentNode);
});

test('update multiple elements using partial execution', function(t) {
  t.plan(2);
  qsa('div').forEach(classtweak('+test'));

  t.ok(el.classList.contains('test'));
  t.ok(el2.classList.contains('test'));
});