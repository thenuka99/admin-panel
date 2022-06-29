import usePrevious from './usePrevious';
export default function useChanged(val) {
  var previous = usePrevious(val);
  return val !== previous;
}