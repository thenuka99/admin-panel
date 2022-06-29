"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];

exports.__esModule = true;
exports["default"] = usePrevious;

var _react = _interopRequireDefault(require("react"));

var _useIsomorphicLayoutEffect = _interopRequireDefault(require("./useIsomorphicLayoutEffect"));

function usePrevious(val) {
  var ref = _react["default"].useRef();

  (0, _useIsomorphicLayoutEffect["default"])(function () {
    ref.current = val;
  }, [val]);
  return ref.current;
}