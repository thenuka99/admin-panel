import * as React from 'react';
import ReactDOM from 'react-dom';
export var unstable_batchedUpdates = ReactDOM.unstable_batchedUpdates;
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
export default function useIsScrolling(debounce) {
  var rerender = React.useReducer(function () {
    return {};
  }, {})[1];
  var ref = React.useRef(false);
  useIsomorphicLayoutEffect(function () {
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