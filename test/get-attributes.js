var test = require('tape');
var getAttributes = require('../get-attributes');
var crel = require('crel');
var reRtc = /^(?:rtc-|data-rtc-|rtc:)(.*)$/;
var refData = {
  peer: 'customer',
  stream: 'main'
};
var el;

test('create our test element', function(t) {
  t.plan(2);
  el = crel('video', {
    'rtc-peer': 'customer',
    'rtc-stream': 'main'
  });

  t.ok(el instanceof HTMLVideoElement);
  t.equal(el.getAttribute('rtc-peer'), 'customer');
});

test('extract the rtc-attributes from the test element', function(t) {
  t.plan(1);
  t.deepEqual(getAttributes(reRtc, el), refData);
});

test('partially apply get-attributes', function(t) {
  var extractor;

  t.plan(2);
  extractor = getAttributes(reRtc);
  t.equal(typeof extractor, 'function', 'partially applied');
  t.deepEqual(extractor(el), refData);
});

test('create a test element with alternative attribute (rtc:) names', function(t) {
  t.plan(2);
  el = crel('video', {
    'rtc:peer': 'customer',
    'rtc:stream': 'main'
  });

  t.ok(el instanceof HTMLVideoElement);
  t.equal(el.getAttribute('rtc:peer'), 'customer');
});

test('extract the rtc-attributes from the test element', function(t) {
  t.plan(1);
  t.deepEqual(getAttributes(reRtc, el), refData);
});

test('create a test element with alternative attribute (data-rtc-) names', function(t) {
  t.plan(2);
  el = crel('video', {
    'data-rtc-peer': 'customer',
    'data-rtc-stream': 'main'
  });

  t.ok(el instanceof HTMLVideoElement);
  t.equal(el.getAttribute('data-rtc-peer'), 'customer');
});

test('extract the rtc-attributes from the test element', function(t) {
  t.plan(1);
  t.deepEqual(getAttributes(reRtc, el), refData);
});