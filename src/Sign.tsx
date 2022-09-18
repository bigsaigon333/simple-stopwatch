import { useEffect, useState } from "react";
import useInterval from "./hooks/useInterval";
import { useTimerState, useTimerStateDispatch } from "./timerContext";
import TimeString from "./TimeString";
import { toTimeString } from "./utils";

interface SignProps {
  defaultValue: number;
}

export default function Sign({ defaultValue }: SignProps) {
  const timerState = useTimerState();
  const dispatch = useTimerStateDispatch();

  const [leftTime, setLeftTime] = useState(defaultValue);

  const clearTimer = useInterval(
    () => setLeftTime((prev) => prev - 1),
    timerState === "ticking" ? 1_000 : null
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
