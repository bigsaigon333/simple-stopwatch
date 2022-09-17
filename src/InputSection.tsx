import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import useForceRerender from "./hooks/useForceRerender";

interface InputsProps {
  onSubmit: (totalSeconds: number) => void;
}

export default function InputSection({ onSubmit }: InputsProps): JSX.Element {
  const [value, setValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const trigger = useForceRerender();

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
      `}
      onClick={() => {
        inputRef.current?.focus();
        trigger();
      }}
    >
      {value.split("").map((ch, idx) => (
        <span
          css={css`
            font-size: 2rem;
          `}
          key={ch + idx}
        >
          {ch}
        </span>
      ))}
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

function removeStartingZero(num: number): string {
  return num.toString().replace(/^(0+)[^0]/, "");
}

function calculateTotalSeconds({
  hours,
  minutes,
  seconds,
}: {
  hours: number;
  minutes: number;
  seconds: number;
}) {
  return (hours * 60 + minutes) * 60 + seconds;
}

const flicker = keyframes`
0% {
  opacity: 0;
} 75% {
  opacity: 1;
}
100% {
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
