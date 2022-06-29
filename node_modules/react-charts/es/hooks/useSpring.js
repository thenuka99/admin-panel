import _construct from "@babel/runtime/helpers/esm/construct";
import React from 'react';
import { Spring } from '../utils/spring';
import useGetLatest from './useGetLatest';
export function useSpring(value, config, cb, immediate, debug) {
  var springRef = React.useRef(_construct(Spring, [value].concat(config)));
  var getValue = useGetLatest(value);

  var _useRaf = useRaf(function () {
    cb(springRef.current.x());
    return springRef.current.done();
  }),
      startRaf = _useRaf[0],
      stopRaf = _useRaf[1]; // Immediate


  React.useEffect(function () {
    if (immediate) {
      springRef.current.snap(getValue());
      startRaf();
      return;
    }

    springRef.current.setEnd(value);
    startRaf();
  }, [debug, getValue, immediate, startRaf, stopRaf, value]);
  React.useEffect(function () {
    return function () {
      stopRaf();
    };
  }, [stopRaf]);
  return springRef.current;
}
export function useRaf(callback) {
  var raf = React.useRef(null);
  var rafCallback = React.useRef(callback);
  rafCallback.current = callback;
  var tick = React.useCallback(function () {
    if (rafCallback.current()) return;
    raf.current = requestAnimationFrame(tick);
  }, []);
  return [React.useMemo(function () {
    return tick;
  }, [tick]), React.useMemo(function () {
    return function () {
      return raf.current && cancelAnimationFrame(raf.current);
    };
  }, [])];
}