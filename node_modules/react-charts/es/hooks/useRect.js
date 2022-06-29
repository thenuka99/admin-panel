import observeRect from '@reach/observe-rect';
import React from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
export default function useRect(node, enabled) {
  var _React$useState = React.useState(node),
      element = _React$useState[0],
      setElement = _React$useState[1];

  var _React$useState2 = React.useState({
    width: 0,
    height: 0
  }),
      rect = _React$useState2[0],
      setRect = _React$useState2[1];

  var rectRef = React.useRef(rect);
  rectRef.current = rect;
  useIsomorphicLayoutEffect(function () {
    if (node !== element) {
      setElement(node);
    }
  });
  useIsomorphicLayoutEffect(function () {
    if (enabled && element) {
      setRect(element.getBoundingClientRect());
    }
  }, [element, enabled]);
  React.useEffect(function () {
    if (!element || !enabled) {
      return;
    }

    var observer = observeRect(element, function (newRect) {
      setRect(newRect);
    });
    observer.observe();
    return function () {
      observer.unobserve();
    };
  }, [element, enabled]); // const resolvedRect = React.useMemo(() => {
  //   if (!element || !(element as Element).tagName) {
  //     return rect
  //   }
  //   const styles = window.getComputedStyle(element as Element)
  //   return {
  //     x: rect.x,
  //     y: rect.y,
  //     width:
  //       rect.width -
  //       parseInt(styles.borderLeftWidth) -
  //       parseInt(styles.borderRightWidth),
  //     height:
  //       rect.height -
  //       parseInt(styles.borderTopWidth) -
  //       parseInt(styles.borderBottomWidth),
  //     top: rect.top,
  //     right: rect.right,
  //     bottom: rect.bottom,
  //     left: rect.left,
  //   }
  // }, [element, rect])

  return rect;
}