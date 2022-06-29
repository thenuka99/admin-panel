"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];

exports.__esModule = true;
exports.useSpring = useSpring;
exports.useRaf = useRaf;

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

var _react = _interopRequireDefault(require("react"));

var _spring = require("../utils/spring");

var _useGetLatest = _interopRequireDefault(require("./useGetLatest"));

function useSpring(value, config, cb, immediate, debug) {
  var springRef = _react["default"].useRef((0, _construct2["default"])(_spring.Spring, [value].concat(config)));

  var getValue = (0, _useGetLatest["default"])(value);

  var _useRaf = useRaf(function () {
    cb(springRef.current.x());
    return springRef.current.done();
  }),
      startRaf = _useRaf[0],
      stopRaf = _useRaf[1]; // Immediate


  _react["default"].useEffect(function () {
    if (immediate) {
      springRef.current.snap(getValue());
      startRaf();
      return;
    }

    springRef.current.setEnd(value);
    startRaf();
  }, [debug, getValue, immediate, startRaf, stopRaf, value]);

  _react["default"].useEffect(function () {
    return function () {
      stopRaf();
    };
  }, [stopRaf]);

  return springRef.current;
}

function useRaf(callback) {
  var raf = _react["default"].useRef(null);

  var rafCallback = _react["default"].useRef(callback);

  rafCallback.current = callback;

  var tick = _react["default"].useCallback(function () {
    if (rafCallback.current()) return;
    raf.current = requestAnimationFrame(tick);
  }, []);

  return [_react["default"].useMemo(function () {
    return tick;
  }, [tick]), _react["default"].useMemo(function () {
    return function () {
      return raf.current && cancelAnimationFrame(raf.current);
    };
  }, [])];
}