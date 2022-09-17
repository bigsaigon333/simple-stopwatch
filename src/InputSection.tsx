import { css } from "@emotion/react";
import { useEffect, useState } from "react";

interface InputsProps {
  onSubmit: (totalSeconds: number) => void;
}

export default function InputSection({ onSubmit }: InputsProps): JSX.Element {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    onSubmit(calculateTotalSeconds({ hours, minutes, seconds }));
  }, [hours, minutes, seconds]);

  return (
    <>
      <input
        css={inputCss}
        type="number"
        ref={(ref) => ref && ref.value === "0" && (ref.value = "")}
        value={removeStartingZero(hours)}
        onChange={(e) => setHours(e.target.valueAsNumber || 0)}
        placeholder="HH"
        min="0"
        max="24"
      />
      <input
        css={inputCss}
        type="number"
        ref={(ref) => ref && ref.value === "0" && (ref.value = "")}
        value={removeStartingZero(minutes)}
        onChange={(e) => setMinutes(e.target.valueAsNumber || 0)}
        placeholder="MM"
        min="0"
        max="60"
      />
      <input
        css={inputCss}
        type="number"
        ref={(ref) => ref && ref.value === "0" && (ref.value = "")}
        value={removeStartingZero(seconds)}
        onChange={(e) => setSeconds(e.target.valueAsNumber || 0)}
        placeholder="SS"
        min="0"
        max="60"
      />
    </>
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

const inputCss = css`
  width: 7rem;
  height: 3rem;
  border: none;
  background-color: transparent;
  font-size: 3rem;
  text-align: center;
`;
