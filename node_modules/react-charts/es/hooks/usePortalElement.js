import * as React from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
export default function usePortalElement() {
  var _React$useState = React.useState(),
      portalEl = _React$useState[0],
      setPortalEl = _React$useState[1];

  useIsomorphicLayoutEffect(function () {
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