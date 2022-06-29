"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _default = typeof window !== 'undefined' ? _react["default"].useLayoutEffect : _react["default"].useEffect;

exports["default"] = _default;