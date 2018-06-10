'use strict';

exports.__esModule = true;
exports.DanteEditor = exports.Dante = undefined;

var _init = require('./components/init.js');

if (typeof window !== 'undefined') {
  window.Dante = _init.Dante;
  window.DanteEditor = _init.DanteEditor;
}

exports.Dante = _init.Dante;
exports.DanteEditor = _init.DanteEditor;