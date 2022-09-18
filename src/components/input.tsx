import { css } from "@emotion/react";
import { InputHTMLAttributes, useEffect, useRef } from "react";
import { useTimerState } from "../contexts/timer-context";
import useBoolean from "../hooks/use-boolean";
import TimeString from "./time-string";

interface InputProperties extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

export default (function Input({
  value,
  onChange,
  placeholder,
}: InputProperties): JSX.Element {
  const timerState = useTimerState();

  const [isFocused, focus, blur] = useBoolean(false);

  const inputReference = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (timerState === "edit") {
      inputReference.current?.focus();
      focus();
    }
  }, [timerState]);

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <TimeString
        value={value}
        dirty
        placeholder={placeholder}
        focused={isFocused}
        onClick={() => {
          if (inputReference.current == undefined) {
            return;
          }

          inputReference.current.focus();
          focus();
        }}
      />
      <input
        ref={inputReference}
        css={css`
          height: 0px;
          left: 20px;
          position: absolute;
          opacity: 0;
          top: 20px;
          width: 0;
          z-index: -2;
        `}
        pattern="\d*"
        value={value}
        onChange={onChange}
        onBlur={blur}
        onFocus={(event) => {
          focus();
          event.target.setSelectionRange(
            event.target.value.length,
            event.target.value.length
          );
        }}
      />
    </div>
  );
});
