import { useState } from "react";
import Controls from "./components/controls";
import EditForm, { formCss } from "./components/edit-form";
import Sign from "./components/sign";
import {
  useTimerStateDispatch,
  useTimerState,
  getNextStateWhenSubmitted,
} from "./contexts/timer-context";
import { toTimeString } from "./utils/utils";

const MAX_TOTAL_SECONDS = 100 * 60 * 60 - 1; // 99h59m59s

export default function App(): JSX.Element {
  const dispatch = useTimerStateDispatch();
  const timerState = useTimerState();

  const [totalSeconds, setTotalSeconds] = useState(0);

  const handleSubmit = (seconds: number) => {
    const validatedSeconds = Math.min(MAX_TOTAL_SECONDS, seconds);

    setTotalSeconds(validatedSeconds);

    dispatch(getNextStateWhenSubmitted(timerState));
  };

  return timerState === "edit" ? (
    <EditForm
      onSubmit={handleSubmit}
      placeholder={toTimeString(totalSeconds).padStart(6, "0")}
      submitDisabled={timerState === "edit" && totalSeconds === 0}
    />
  ) : (
    <form
      css={formCss}
      onSubmit={(event) => {
        event.preventDefault();
        dispatch(getNextStateWhenSubmitted(timerState));
      }}
    >
      <Sign key={totalSeconds} defaultValue={totalSeconds} />
      <Controls />
    </form>
  );
}
