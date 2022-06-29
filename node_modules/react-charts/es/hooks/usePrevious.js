import React from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
export default function usePrevious(val) {
  var ref = React.useRef();
  useIsomorphicLayoutEffect(function () {
    ref.current = val;
  }, [val]);
  return ref.current;
}