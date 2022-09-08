import { useRef, useEffect } from "react";

const useInterval = (
  cb: () => void,
  interval?: number | null
): (() => void) => {
  const timeIdRef = useRef<number>();

  useEffect(() => {
    if (interval === null) {
      return;
    }

    timeIdRef.current = setInterval(cb, interval);

    return () => clearInterval(timeIdRef.current);
  }, [cb, interval]);

  return () => clearInterval(timeIdRef.current);
};

export default useInterval;
