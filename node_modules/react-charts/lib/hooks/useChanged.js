"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];

exports.__esModule = true;
exports["default"] = useChanged;

var _usePrevious = _interopRequireDefault(require("./usePrevious"));

function useChanged(val) {
  var previous = (0, _usePrevious["default"])(val);
  return val !== previous;
}