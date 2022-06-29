"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];

exports.__esModule = true;
exports["default"] = useRect;

var _observeRect = _interopRequireDefault(require("@reach/observe-rect"));

var _react = _interopRequireDefault(require("react"));

var _useIsomorphicLayoutEffect = _interopRequireDefault(require("./useIsomorphicLayoutEffect"));

function useRect(node, enabled) {
  var _React$useState = _react["default"].useState(node),
      element = _React$useState[0],
      setElement = _React$useState[1];

  var _React$useState2 = _react["default"].useState({
    width: 0,
    height: 0
  }),
      rect = _React$useState2[0],
      setRect = _React$useState2[1];

  var rectRef = _react["default"].useRef(rect);

  rectRef.current = rect;
  (0, _useIsomorphicLayoutEffect["default"])(function () {
    if (node !== element) {
      setElement(node);
    }
  });
  (0, _useIsomorphicLayoutEffect["default"])(function () {
    if (enabled && element) {
      setRect(element.getBoundingClientRect());
    }
  }, [element, enabled]);

  _react["default"].useEffect(function () {
    if (!element || !enabled) {
      return;
    }

    var observer = (0, _observeRect["default"])(element, function (newRect) {
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