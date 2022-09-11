import { useEffect } from "react";
import useInterval from "./hooks/useInterval";
import { useTimerState, useTimerStateDispatch } from "./timerContext";

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

  return <p>{toTimeString(value)}</p>;
}

function toTimeString(time: number): string {
  const seconds = time % 60;
  time = Math.floor(time / 60);
  const minutes = time % 60;
  const hours = Math.floor(time / 60);

  return [hours, minutes, seconds]
    .map((num) => num.toString())
    .map((str) => str.padStart(2, "0"))
    .join(":");
}
