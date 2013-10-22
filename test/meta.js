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