var async = require('async');
var test = require('tape');
var crel = require('crel');
var on = require('../on');
var waitLoad;
var scripts = [
  '//cdnjs.cloudflare.com/ajax/libs/ace/1.1.01/ace.js',
  '//cdnjs.cloudflare.com/ajax/libs/chainvas/2.1/chainvas.js'
];
var scriptElements;

test('can wait for a single script to load', function(t) {
  var el = crel('script', {
    src: '//cdnjs.cloudflare.com/ajax/libs/fastclick/0.6.7/fastclick.min.js'
  });

  t.plan(1);
  on('load', el)(function() {
    t.pass('triggered load');
  });

  document.body.appendChild(el);
});

test('can partially apply on', function(t) {
  t.plan(1);
  waitLoad = on('load');
  t.equal(typeof waitLoad, 'function');
});

test('create test script elements', function(t) {
  t.plan(scripts.length);

  scriptElements = scripts.map(function(url) {
    return crel('script', { src: url });
  });

  scriptElements.forEach(function(script, idx) {
    t.equal(script.getAttribute('src'), scripts[idx]);
  });
});

test('can use async to wait load for multiple elements', function(t) {
  t.plan(1);

  async.parallel(scriptElements.map(waitLoad), function() {
    t.pass('all loaded');
  });

  scriptElements.forEach(function(el) {
    document.body.appendChild(el);
  });
});

test('can fully apply on in a single call', function(t) {
  var el = crel('script', { src: '//cdnjs.cloudflare.com/ajax/libs/hammer.js/1.0.5/hammer.min.js' });

  t.plan(1);
  on('load', el, function() {
    t.pass('loaded script');
  });

  document.body.appendChild(el);
});