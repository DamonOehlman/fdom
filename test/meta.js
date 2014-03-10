var test = require('tape');
var crel = require('crel');
var meta = require('../meta');

test('create some test metadata', function(t) {
  var m1 = crel('meta', { name: 'test', content: 'hi' });
  var m2 = crel('meta', { name: 'foo', content: 'bar' });

  document.head.appendChild(m1);
  document.head.appendChild(m2);

  t.plan(6);
  t.ok(m1 instanceof HTMLMetaElement);
  t.equal(m1.getAttribute('name'), 'test');
  t.equal(m1.parentNode, document.head);

  t.ok(m2 instanceof HTMLMetaElement);
  t.equal(m2.getAttribute('name'), 'foo');
  t.equal(m2.parentNode, document.head);
});

test('extract the metadata', function(t) {
  t.plan(1);
  t.deepEqual(meta(), {
    test: 'hi',
    foo: 'bar'
  });
});

test('extract matching metadata', function(t) {
  t.plan(1);
  t.deepEqual(meta(/^foo/), {
    foo: 'bar'
  });
});

test('create namespaced elements', function(t) {
  var m1 = crel('meta', { name: 'dd-name', content: 'fred' });
  var m2 = crel('meta', { name: 'dd-title', content: 'sir' });

  document.head.appendChild(m1);
  document.head.appendChild(m2);

  t.plan(6);
  t.ok(m1 instanceof HTMLMetaElement);
  t.equal(m1.getAttribute('name'), 'dd-name');
  t.equal(m1.parentNode, document.head);

  t.ok(m2 instanceof HTMLMetaElement);
  t.equal(m2.getAttribute('name'), 'dd-title');
  t.equal(m2.parentNode, document.head);
});

test('extract all the elements', function(t) {
  t.plan(1);
  t.deepEqual(meta(), {
    test: 'hi',
    foo: 'bar',
    'dd-name': 'fred',
    'dd-title': 'sir'
  });
});

test('extra a capture group subset', function(t) {
  t.plan(1);
  t.deepEqual(meta(/^dd-(.*)$/), {
    name: 'fred',
    title: 'sir'
  });
});

test('create some intish metadata', function(t) {
  var m = crel('meta', { name: 'intish', content: 5 });

  document.head.appendChild(m);

  t.plan(3);
  t.ok(m instanceof HTMLMetaElement);
  t.equal(m.getAttribute('name'), 'intish');
  t.equal(m.parentNode, document.head);
});

test('extract as integer value', function(t) {
  t.plan(1);
  t.deepEqual(meta(/^intish/), {
    intish: 5
  });
});

test('create intish metadata with a 0 value', function(t) {
  var m = crel('meta', { name: 'zeroish', content: 0 });

  document.head.appendChild(m);

  t.plan(3);
  t.ok(m instanceof HTMLMetaElement);
  t.equal(m.getAttribute('name'), 'zeroish');
  t.equal(m.parentNode, document.head);
});

test('extract as integer value', function(t) {
  t.plan(1);
  t.deepEqual(meta(/^zeroish/), {
    zeroish: 0
  });
});

test('create some floatish metadata', function(t) {
  var m = crel('meta', { name: 'floatish', content: 8.3 });

  document.head.appendChild(m);

  t.plan(3);
  t.ok(m instanceof HTMLMetaElement);
  t.equal(m.getAttribute('name'), 'floatish');
  t.equal(m.parentNode, document.head);
});

test('extract as float value', function(t) {
  t.plan(1);
  t.deepEqual(meta(/^floatish/), {
    floatish: 8.3
  });
});

test('create some boolish metadata (falsy)', function(t) {
  var m = crel('meta', { name: 'falsey', content: false });

  document.head.appendChild(m);

  t.plan(4);
  t.ok(m instanceof HTMLMetaElement);
  t.equal(m.getAttribute('name'), 'falsey');
  t.equal(m.getAttribute('content'), 'false');
  t.equal(m.parentNode, document.head);
});

test('extract as boolean value', function(t) {
  t.plan(1);
  t.deepEqual(meta(/^falsey/), {
    falsey: false
  });
});

test('create some boolish metadata (truthy)', function(t) {
  var m = crel('meta', { name: 'truthy', content: true });

  document.head.appendChild(m);

  t.plan(4);
  t.ok(m instanceof HTMLMetaElement);
  t.equal(m.getAttribute('name'), 'truthy');
  t.equal(m.getAttribute('content'), 'true');
  t.equal(m.parentNode, document.head);
});

test('extract as boolean value', function(t) {
  t.plan(1);
  t.deepEqual(meta(/^truthy/), {
    truthy: true
  });
});