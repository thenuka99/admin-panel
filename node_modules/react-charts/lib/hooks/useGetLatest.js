"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];

exports.__esModule = true;
exports["default"] = useGetLatest;

var _react = _interopRequireDefault(require("react"));

function useGetLatest(obj) {
  var ref = _react["default"].useRef(obj);

  var getterRef = _react["default"].useRef();

  ref.current = obj;

  if (!getterRef.current) {
    getterRef.current = function () {
      return ref.current;
    };
  }

  return getterRef.current;
}