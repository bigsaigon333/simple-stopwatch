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

export default function Page(): JSX.Element {
  const dispatch = useTimerStateDispatch();
  const timerState = useTimerState();

  const [totalSeconds, setTotalSeconds] = useState(0);

  const handleSubmit = (seconds: number) => {
    setTotalSeconds(seconds);

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
