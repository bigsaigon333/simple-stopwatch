import { useCallback, useEffect, useState } from "react";
import useInterval from "./hooks/useInterval";
import { useTimerState } from "./timerContext";

interface SignProps {
  defaultValue: number;
}

export default function Sign({ defaultValue }: SignProps) {
  const [totalSeconds, setTotalSeconds] = useState(defaultValue);

  const timerState = useTimerState();

  const timerCallback = useCallback(() => {
    setTotalSeconds((prev) => prev - 1);
  }, [setTotalSeconds]);

  const clearTimer = useInterval(
    timerCallback,
    timerState === "ticking" ? 1_000 : null
  );

  return <p>{toTimeString(totalSeconds)}</p>;
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
