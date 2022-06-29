import React from 'react';
export default function useLatestWhen(obj, when) {
  if (when === void 0) {
    when = true;
  }

  var ref = React.useRef(when ? obj : null);

  if (when) {
    ref.current = obj;
  }

  return ref.current;
}