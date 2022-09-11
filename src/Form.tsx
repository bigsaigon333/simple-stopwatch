import { useCallback, useState } from "react";
import useInterval from "./hooks/useInterval";
import InputSection from "./InputSection";
import Sign from "./Sign";
import {
  TimerState,
  useTimerState,
  useTimerStateDispatch,
} from "./timerContext";

export default function Form(): JSX.Element {
  const dispatch = useTimerStateDispatch();
  const timerState = useTimerState();

  const [totalSeconds, setTotalSeconds] = useState(0);

  const timerCallback = () => {
    setTotalSeconds((prev) => prev - 1);
  };

  return (
    <form
      className="App"
      onSubmit={(e) => {
        e.preventDefault();

        // TODO: validate hours, minutes, seconds

        dispatch(getNextStateWhenSubmitted(timerState));
      }}
    >
      <div>
        {timerState === "idle" ? (
          <InputSection onSubmit={setTotalSeconds} />
        ) : (
          <Sign value={totalSeconds} onTimerChange={timerCallback} />
        )}
      </div>

      <button type="submit">{getMainButtonMessage(timerState)}</button>
      <button type="button" onClick={() => dispatch("idle")}>
        Reset
      </button>
    </form>
  );
}

function getMainButtonMessage(state: TimerState): string {
  switch (state) {
    case "idle":
      return "Start";
    case "ticking":
      return "Pause";
    case "paused":
      return "Resume";
    case "done":
      return "Ok";
    default:
      throw new Error(`Unexpected state: ${state}`);
  }
}

function getNextStateWhenSubmitted(state: TimerState): TimerState {
  switch (state) {
    case "idle":
      return "ticking";
    case "ticking":
      return "paused";
    case "paused":
      return "ticking";
    case "done":
      return "idle";
    default:
      throw new Error(`Unexpected state: ${state}`);
  }
}
