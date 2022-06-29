"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];

exports.__esModule = true;
exports["default"] = useIsScrolling;
exports.unstable_batchedUpdates = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _useIsomorphicLayoutEffect = _interopRequireDefault(require("./useIsomorphicLayoutEffect"));

var unstable_batchedUpdates = _reactDom["default"].unstable_batchedUpdates;
exports.unstable_batchedUpdates = unstable_batchedUpdates;

function useIsScrolling(debounce) {
  var rerender = React.useReducer(function () {
    return {};
  }, {})[1];
  var ref = React.useRef(false);
  (0, _useIsomorphicLayoutEffect["default"])(function () {
    var timeout;

    var cb = function cb() {
      if (!ref.current) {
        ref.current = true;
        rerender();
      }

      clearTimeout(timeout);
      timeout = setTimeout(function () {
        if (ref.current) {
          ref.current = false;
          rerender();
        }
      }, debounce);
    };

    document.addEventListener('scroll', cb, true);
    return function () {
      clearTimeout(timeout);
      document.removeEventListener('scroll', cb);
    };
  }, [debounce]);
  return ref.current;
}