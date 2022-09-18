import { useEffect, useState } from "react";
import useInterval from "../hooks/use-interval";
import {
  useTimerState,
  useTimerStateDispatch,
} from "../contexts/timer-context";
import TimeString from "./time-string";
import { toTimeString } from "../utils/utils";

interface SignProperties {
  defaultValue: number;
}

export default function Sign({ defaultValue }: SignProperties) {
  const timerState = useTimerState();
  const dispatch = useTimerStateDispatch();

  const [leftTime, setLeftTime] = useState(defaultValue);

  const clearTimer = useInterval(
    () => setLeftTime((previous) => previous - 1),
    timerState === "ticking" ? 1000 : undefined
  );

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
