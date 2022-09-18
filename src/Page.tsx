import { useState } from "react";
import Controls from "./Controls";
import Form, { formCss } from "./Form";
import Sign from "./Sign";
import {
  useTimerStateDispatch,
  useTimerState,
  getNextStateWhenSubmitted,
} from "./timerContext";
import { toTimeString } from "./utils";

export default function Page(): JSX.Element {
  const dispatch = useTimerStateDispatch();
  const timerState = useTimerState();

  const [totalSeconds, setTotalSeconds] = useState(0);

  const handleSubmit = (seconds: number) => {
    setTotalSeconds(seconds);

    dispatch(getNextStateWhenSubmitted(timerState));
  };

  return timerState === "edit" ? (
    <Form
      onSubmit={handleSubmit}
      placeholder={toTimeString(totalSeconds).padStart(6, "0")}
    >
      <Controls />
    </Form>
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
