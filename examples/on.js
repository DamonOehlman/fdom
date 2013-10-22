var async = require('async');
var crel = require('crel');
var waitLoad = require('../on')('load');
var scripts = [
  '//cdnjs.cloudflare.com/ajax/libs/ace/1.1.01/ace.js',
  '//cdnjs.cloudflare.com/ajax/libs/chainvas/2.1/chainvas.js'
];

// create the script elements
scripts = scripts.map(function(url) {
  var el = crel('script', { src: url });
  document.body.appendChild(el);

  return el;
})

async.parallel(scripts.map(waitLoad), function(err) {
  console.log('all scripts loaded');
});