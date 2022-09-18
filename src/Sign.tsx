import { useEffect } from "react";
import useInterval from "./hooks/useInterval";
import { useTimerState, useTimerStateDispatch } from "./timerContext";
import TimeString from "./TimeString";
import { toTimeString } from "./utils";

interface SignProps {
  value: number;
  onTimerChange: () => void;
}

export default function Sign({ value, onTimerChange }: SignProps) {
  const timerState = useTimerState();
  const dispatch = useTimerStateDispatch();

  const clearTimer = useInterval(
    onTimerChange,
    timerState === "ticking" ? 1_000 : null
  );

  useEffect(() => {
    if (value === 0) {
      clearTimer();
      dispatch("done");
    }
  }, [value]);

  return (
    <div>
      <TimeString value={toTimeString(value)} />
    </div>
  );
}
