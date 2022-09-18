import { css } from "@emotion/react";
import Audio from "./audio";
import {
  TimerState,
  useTimerState,
  useTimerStateDispatch,
} from "../contexts/timer-context";
import useToggle from "../hooks/use-toggle";

export default function Controls(): JSX.Element {
  const dispatch = useTimerStateDispatch();
  const timerState = useTimerState();

  const [muted, toggle] = useToggle(false);

  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        justify-content: space-between;
      `}
    >
      <button css={buttonCss} type="button" onClick={() => toggle()}>
        {muted ? "unmute" : "mute"}
      </button>
      <button
        css={css`
          ${buttonCss}
          color: red;
        `}
        type="button"
        onClick={() => dispatch("edit")}
      >
        Reset
      </button>
      <button css={buttonCss} type="submit">
        {getMainButtonMessage(timerState)}
      </button>
      <Audio play={timerState === "done"} muted={muted} />
    </div>
  );
}

function getMainButtonMessage(state: TimerState): string {
  switch (state) {
    case "edit":
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

const buttonCss = css`
  width: 8rem;
  height: 3.5rem;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0;
`;
