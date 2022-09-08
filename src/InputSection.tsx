import { useState } from "react";

export default function Inputs(): JSX.Element {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  return (
    <div>
      <input
        type="number"
        ref={(ref) => ref && ref.value === "0" && (ref.value = "")}
        value={removeStartingZero(hours)}
        onChange={(e) => setHours(e.target.valueAsNumber || 0)}
        placeholder="HH"
        min="0"
        max="24"
      />
      <span>:</span>
      <input
        type="number"
        ref={(ref) => ref && ref.value === "0" && (ref.value = "")}
        value={removeStartingZero(minutes)}
        onChange={(e) => setMinutes(e.target.valueAsNumber || 0)}
        placeholder="MM"
        min="0"
        max="60"
      />
      <span>:</span>
      <input
        type="number"
        ref={(ref) => ref && ref.value === "0" && (ref.value = "")}
        value={removeStartingZero(seconds)}
        onChange={(e) => setSeconds(e.target.valueAsNumber || 0)}
        placeholder="SS"
        min="0"
        max="60"
      />
    </div>
  );
}

function removeStartingZero(num: number): string {
  return num.toString().replace(/^(0+)[^0]/, "");
}
