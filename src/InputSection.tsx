import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import useForceRerender from "./hooks/useForceRerender";
import TimeString from "./TimeString";

interface InputsProps {
  onSubmit: (totalSeconds: number) => void;
}

export default function InputSection({ onSubmit }: InputsProps): JSX.Element {
  const [value, setValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const trigger = useForceRerender();

  useEffect(() => {
    onSubmit(calculateTotalSeconds(value));
  }, [value]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (/^\d{0,6}$/.test(event.target.value)) {
      setValue(event.target.value);
    }
  };

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 3rem;
        padding: 0.25rem;
        box-sizing: border-box;
        text-align: right;
      `}
      onClick={() => {
        inputRef.current?.focus();
        trigger();
      }}
    >
      <TimeString value={value} />
      {document.activeElement === inputRef.current && <Cursor />}
      <input
        ref={inputRef}
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
        onChange={handleChange}
        onBlur={trigger}
        onFocus={trigger}
      />
    </div>
  );
}

function calculateTotalSeconds(value: string): number {
  const timeString = value.padStart(6, "0");

  const hours = Number(timeString.slice(0, 2));
  const minutes = Number(timeString.slice(2, 4));
  const seconds = Number(timeString.slice(4, 6));

  return (hours * 60 + minutes) * 60 + seconds;
}

const flicker = keyframes`
0% {
  opacity: 0;
} 75% {
  opacity: 1;
} 100% {
  opacity: 0.7;
}
`;

const Cursor = styled.span`
  display: inline-block;
  animation-name: ${flicker};
  animation-iteration-count: infinite;
  animation-duration: 0.7s;
  animation-timing-function: ease-in-out;
  width: 4px;
  height: 2rem;
  background-color: aqua;
`;
