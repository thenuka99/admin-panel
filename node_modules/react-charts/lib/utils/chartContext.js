"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];

exports.__esModule = true;
exports.ChartContextProvider = ChartContextProvider;
exports["default"] = useChartContext;

var React = _interopRequireWildcard(require("react"));

var chartContext = /*#__PURE__*/React.createContext(null);

function ChartContextProvider(_ref) {
  var value = _ref.value,
      children = _ref.children;
  return /*#__PURE__*/React.createElement(chartContext.Provider, {
    value: value,
    children: children
  });
}

function useChartContext() {
  return React.useContext(chartContext)();
}