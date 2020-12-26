import {useCallback, useEffect, useRef} from 'react';

function useInterval(callback, interval = 1000, params = []) {
  const ref = useRef();

  const cb = useCallback(() => callback(...params), [callback, params]);

  useEffect(() => {
    cb();
    ref.current = setInterval(cb, interval);
    return () => clearInterval(ref.current);
  }, [cb, interval]);
  return ref;
}

export default useInterval;
