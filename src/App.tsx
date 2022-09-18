import { useState } from "react";
import Controls from "./components/Controls";
import EditForm, { formCss } from "./components/EditForm";
import Sign from "./components/Sign";
import {
  useTimerStateDispatch,
  useTimerState,
  getNextStateWhenSubmitted,
} from "./contexts/timerContext";
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
    >
      <Controls />
    </EditForm>
  ) : (
    <form
      css={formCss}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(getNextStateWhenSubmitted(timerState));
      }}
    >
      <Sign key={totalSeconds} defaultValue={totalSeconds} />
      <Controls />
    </form>
  );
}
