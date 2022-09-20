import { useCallback, useEffect, useState } from "react";

import useInterval from "../hooks/use-interval";
import {
  useTimerState,
  useTimerStateDispatch,
} from "../contexts/timer-context";
import TimeString from "./time-string";
import { toTimeString, toTimeTuple } from "../utils/utils";

interface SignProperties {
  defaultValue: number;
}

export default function Sign({ defaultValue }: SignProperties) {
  const timerState = useTimerState();
  const dispatch = useTimerStateDispatch();

  const [leftTime, setLeftTime] = useState(defaultValue);
  const callback = useCallback(() => {
    setLeftTime((previous) => {
      document.title = toTimeTuple(previous - 1).join(":");

      return previous - 1;
    });
  }, [setLeftTime]);

  const clearTimer = useInterval(
    callback,
    timerState === "ticking" ? 1000 : undefined
  );

  useEffect(() => {
    document.title = toTimeTuple(defaultValue).join(":");
  }, [defaultValue]);

  useEffect(() => {
    if (leftTime === 0) {
      clearTimer();
      dispatch("done");
    }
  }, [leftTime]);

  return (
    <div>
      <TimeString value={toTimeString(leftTime)} />
    </div>
  );
}
