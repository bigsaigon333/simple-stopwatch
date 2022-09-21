import { useRef, useEffect, useCallback, MutableRefObject } from "react";
import TimerWorker from "../workers/timer-worker?worker";

const useIntervalDebug = (): [MutableRefObject<number>, () => void] => {
  const currentTimeReference = useRef(document.timeline.currentTime as number);
  const previousTimeReference = useRef<number>();
  const resultReference = useRef(0);

  const update = useCallback(() => {
    previousTimeReference.current = currentTimeReference.current;
    currentTimeReference.current = document.timeline.currentTime as number;
    resultReference.current =
      currentTimeReference.current - previousTimeReference.current;
  }, []);

  return [resultReference, update];
};

const useInterval = (
  callback: () => void,
  interval?: number | null
): (() => void) => {
  const timeIdReference = useRef<number>();
  const [realIntervalReference, update] = useIntervalDebug();

  useEffect(() => {
    if (interval == undefined) {
      return;
    }

    const myWorker = new TimerWorker();

    myWorker.postMessage({ type: "setInterval", interval });

    const handleMessage = () => {
      callback();

      if (import.meta.env.DEV) {
        console.log(realIntervalReference.current);
        update();
      }
    };

    myWorker.addEventListener("message", handleMessage);

    return () => {
      myWorker.removeEventListener("message", handleMessage);
      myWorker.postMessage({ type: "clearInterval" });

      if (import.meta.env.DEV) {
        console.log("useEffect return function invoked");
      }
    };
  }, [callback, interval, update]);

  return () => clearInterval(timeIdReference.current);
};

export default useInterval;
