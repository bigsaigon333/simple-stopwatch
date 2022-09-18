import { useRef, useEffect } from "react";

const useInterval = (
  callback: () => void,
  interval?: number | null
): (() => void) => {
  const timeIdReference = useRef<number>();

  useEffect(() => {
    if (interval == undefined) {
      return;
    }

    timeIdReference.current = setInterval(callback, interval);

    return () => clearInterval(timeIdReference.current);
  }, [callback, interval]);

  return () => clearInterval(timeIdReference.current);
};

export default useInterval;
