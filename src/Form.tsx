import { css } from "@emotion/react";
import { useState } from "react";
import InputSection from "./InputSection";
import Sign from "./Sign";
import {
  TimerState,
  useTimerState,
  useTimerStateDispatch,
} from "./timerContext";

interface FormProps {
  className?: string;
}

export default function Form({ className }: FormProps): JSX.Element {
  const dispatch = useTimerStateDispatch();
  const timerState = useTimerState();

  const [totalSeconds, setTotalSeconds] = useState(0);

  const timerCallback = () => {
    setTotalSeconds((prev) => prev - 1);
  };

  return (
    <form
      className={className}
      css={css`
        width: 25rem;
      `}
      onSubmit={(e) => {
        e.preventDefault();

        // TODO: validate hours, minutes, seconds

        dispatch(getNextStateWhenSubmitted(timerState));
      }}
    >
      <div
        css={css`
          margin-bottom: 2rem;
        `}
      >
        {timerState === "idle" ? (
          <InputSection onSubmit={setTotalSeconds} />
        ) : (
          <Sign value={totalSeconds} onTimerChange={timerCallback} />
        )}
      </div>

      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: space-between;
        `}
      >
        <button
          css={css`
            ${buttonCss}
            color: red;
          `}
          type="button"
          onClick={() => dispatch("idle")}
        >
          Reset
        </button>
        <button css={buttonCss} type="submit" disabled={totalSeconds <= 0}>
          {getMainButtonMessage(timerState)}
        </button>
      </div>
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

const buttonCss = css`
  width: 8rem;
  height: 3.5rem;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0;
`;
