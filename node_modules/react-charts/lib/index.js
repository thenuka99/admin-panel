"use strict";

exports.__esModule = true;
var _exportNames = {
  Chart: true
};
exports.Chart = void 0;

var _Chart = require("./components/Chart");

exports.Chart = _Chart.Chart;

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  exports[key] = _types[key];
});