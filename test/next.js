var crel = require('crel');
var test = require('tape');
var next = require('../next');
var keydown;
var el;

function dispatchKeys(codes) {
  [].concat(codes).forEach(function(code) {
    var evt = new KeyboardEvent('keydown');
    evt.keycode = code;

    el.dispatchEvent(evt);
  });
}

test('create a test element', function(t) {
  t.plan(1);
  el = crel('div');
  t.ok(el instanceof HTMLDivElement);
});

test('create a next keydown requester', function(t) {
  t.plan(1);
  keydown = next('keydown', el);
  t.equal(typeof keydown, 'function');
});

test('can listen for a keydown', function(t) {
  keydown(function(err, evt) {
    t.equal(evt.keycode, 39);
  });

  t.plan(1);
  dispatchKeys([39]);
});

test('can listen for multiple keys', function(t) {
  keydown(function(err, evt) {
    t.equal(evt.keycode, 39);
  });

  keydown(function(err, evt) {
    t.equal(evt.keycode, 40);
  });

  keydown(function(err, evt) {
    t.equal(evt.keycode, 41);
  });

  t.plan(3);
  dispatchKeys([39, 40, 41]);
});

test('can get multiple keys from the internal buffer', function(t) {
  t.plan(3);
  dispatchKeys([50, 51, 52]);

  keydown(function(err, evt) {
    t.equal(evt.keycode, 50);
  });

  keydown(function(err, evt) {
    t.equal(evt.keycode, 51);
  });

  keydown(function(err, evt) {
    t.equal(evt.keycode, 52);
  });
});

test('can stop remove event listeners', function(t) {
  keydown(function(err, evt) {
    t.equal(evt.keycode, 60);
  });

  keydown(function(err, evt) {
    t.equal(evt.keycode, 61);

    // call key down indicating that we have ended the watch
    keydown(true);
  });

  keydown(function(err, evt) {
    t.fail('should not have captured this event');
  });

  t.plan(3);
  dispatchKeys([60, 61, 62]);

  setTimeout(function() {
    t.pass('key did not fire');
  }, 100);
});
