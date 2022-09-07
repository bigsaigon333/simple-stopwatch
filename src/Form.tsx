import { useState } from "react";

export default function Form(): JSX.Element {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  return (
    <form
      className="App"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="number"
        ref={(ref) => ref && (ref.value = "")}
        value={removeStartingZero(hours)}
        onChange={(e) => setHours(e.target.valueAsNumber || 0)}
        placeholder="HH"
      />
      <span>:</span>
      <input
        type="number"
        ref={(ref) => ref && (ref.value = "")}
        value={removeStartingZero(minutes)}
        onChange={(e) => setMinutes(e.target.valueAsNumber || 0)}
        placeholder="MM"
      />
      <span>:</span>
      <input
        type="number"
        ref={(ref) => ref && (ref.value = "")}
        value={removeStartingZero(seconds)}
        onChange={(e) => setSeconds(e.target.valueAsNumber || 0)}
        placeholder="SS"
      />
      <button type="submit">Countdown</button>
    </form>
  );
}

function removeStartingZero(num: number): string {
  return num.toString().replace(/^(0+)[^0]/, "");
}
