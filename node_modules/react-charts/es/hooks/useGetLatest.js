import React from 'react';
export default function useGetLatest(obj) {
  var ref = React.useRef(obj);
  var getterRef = React.useRef();
  ref.current = obj;

  if (!getterRef.current) {
    getterRef.current = function () {
      return ref.current;
    };
  }

  return getterRef.current;
}