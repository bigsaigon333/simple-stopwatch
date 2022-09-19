import { css } from "@emotion/react";
import Audio from "./audio";
import {
  TimerState,
  useTimerState,
  useTimerStateDispatch,
} from "../contexts/timer-context";
import useToggle from "../hooks/use-toggle";
import { useEffect, useRef } from "react";

export default function Controls(): JSX.Element {
  const dispatch = useTimerStateDispatch();
  const timerState = useTimerState();

  const [muted, toggle] = useToggle(false);

  const okButtonReference = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (timerState === "done" && okButtonReference.current != undefined) {
      okButtonReference.current.focus();
    }
  }, [timerState]);

  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;
      `}
    >
      <button css={buttonCss} type="submit" ref={okButtonReference}>
        {getMainButtonMessage(timerState)}
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
      <button css={buttonCss} type="button" onClick={() => toggle()}>
        {muted ? "unmute" : "mute"}
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
  width: 4.5rem;
  height: 3rem;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 600;
  padding: 0;
`;
