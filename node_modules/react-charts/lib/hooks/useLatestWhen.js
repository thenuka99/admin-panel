"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];

exports.__esModule = true;
exports["default"] = useLatestWhen;

var _react = _interopRequireDefault(require("react"));

function useLatestWhen(obj, when) {
  if (when === void 0) {
    when = true;
  }

  var ref = _react["default"].useRef(when ? obj : null);

  if (when) {
    ref.current = obj;
  }

  return ref.current;
}