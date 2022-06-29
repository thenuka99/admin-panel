import * as React from 'react';
var chartContext = /*#__PURE__*/React.createContext(null);
export function ChartContextProvider(_ref) {
  var value = _ref.value,
      children = _ref.children;
  return /*#__PURE__*/React.createElement(chartContext.Provider, {
    value: value,
    children: children
  });
}
export default function useChartContext() {
  return React.useContext(chartContext)();
}