/* jshint node: true */
'use strict';

/**
  # dd

  A set of DOM utilities, which were first created in
  [cog](https://github.com/DamonOehlman/cog) but have been extracted as cog
  is more a JS language toolset, and `dd` is it's DOM counterpart.

  As per `cog` it is designed to be used as in a cherry-picking way rather
  than by simply requiring `dd` as a whole module.

  ## Modules

  The following is a list of modules that `dd` provides. Examples demonstrate
  how to `require` and use them in your code.

**/

exports.qsa = require('./qsa');
exports.loader = require('./loader');
exports.raf = require('./raf');