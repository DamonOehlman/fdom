var raf = require('../raf');

function animate() {
  console.log('animating');
  raf(animate); // go again
}

raf(animate);