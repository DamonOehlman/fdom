var crel = require('crel');
var test = require('tape');
var next = require('../next');
var keydown;
var el;

test('create a test element', function(t) {
  t.plan(1);
  el = crel('div');
  t.ok(el instanceof HTMLDivElement);
});

test('get a key sender function from simkey', function(t) {
  t.plan(1);
  simkey = require('simkey')(el);
  t.equal(typeof simkey, 'function', 'got a simkey sender');
});

test('create a next keydown requester', function(t) {
  t.plan(1);
  keydown = next('keydown', el);
  t.equal(typeof keydown, 'function');
});

test('can listen for a keydown', function(t) {
  t.plan(1);
  keydown(function(err, evt) {
    t.equal(evt.keyCode, 39);
  });

  simkey(39);
});

test('can listen for multiple keys', function(t) {
  keydown(function(err, evt) {
    t.equal(evt.keyCode, 39);
  });

  keydown(function(err, evt) {
    t.equal(evt.keyCode, 40);
  });

  keydown(function(err, evt) {
    t.equal(evt.keyCode, 41);
  });

  t.plan(3);
  [39, 40, 41].forEach(simkey);
});

test('can get multiple keys from the internal buffer', function(t) {
  t.plan(3);
  [50, 51, 52].forEach(simkey);

  // wait 50ms as simkey waits till next tick also
  setTimeout(function() {
    keydown(function(err, evt) {
      t.equal(evt.keyCode, 50);
    });

    keydown(function(err, evt) {
      t.equal(evt.keyCode, 51);
    });

    keydown(function(err, evt) {
      t.equal(evt.keyCode, 52);
    });
  }, 50);
});

test('can stop remove event listeners', function(t) {
  keydown(function(err, evt) {
    t.equal(evt.keyCode, 60);
  });

  keydown(function(err, evt) {
    t.equal(evt.keyCode, 61);

    // call key down indicating that we have ended the watch
    keydown(true);
  });

  keydown(function(err, evt) {
    t.fail('should not have captured this event');
  });

  t.plan(3);
  [60, 61, 62].forEach(simkey);

  setTimeout(function() {
    t.pass('key did not fire');
  }, 100);
});
