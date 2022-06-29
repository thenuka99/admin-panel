"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];

exports.__esModule = true;
exports["default"] = usePortalElement;

var React = _interopRequireWildcard(require("react"));

var _useIsomorphicLayoutEffect = _interopRequireDefault(require("./useIsomorphicLayoutEffect"));

function usePortalElement() {
  var _React$useState = React.useState(),
      portalEl = _React$useState[0],
      setPortalEl = _React$useState[1];

  (0, _useIsomorphicLayoutEffect["default"])(function () {
    if (!portalEl) {
      var element = document.getElementById('react-charts-portal');

      if (!element) {
        element = document.createElement('div');
        element.setAttribute('id', 'react-charts-portal');
        Object.assign(element.style, {
          pointerEvents: 'none',
          position: 'fixed',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          'z-index': 99999999999
        });
        document.body.append(element);
      }

      setPortalEl(element);
    }
  });
  return portalEl;
}