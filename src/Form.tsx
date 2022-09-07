import { useState } from "react";

export default function Form(): JSX.Element {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [totalSeconds, setTotalSeconds] = useState(0);

  return (
    <form
      className="App"
      onSubmit={(e) => {
        e.preventDefault();

        // TODO: validate hours, minutes, seconds

        setTotalSeconds((hours * 60 + minutes) * 60 + seconds);

        const timeId = setInterval(() => {
          setTotalSeconds((prev) => {
            if (prev === 0) {
              clearInterval(timeId);
              return 0;
            }

            return prev - 1;
          });
        }, 1_000);
      }}
    >
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
      <button type="submit">Countdown</button>
      <p>{toTimeString(totalSeconds)}</p>
    </form>
  );
}

function removeStartingZero(num: number): string {
  return num.toString().replace(/^(0+)[^0]/, "");
}

function toTimeString(time: number): string {
  const seconds = time % 60;
  time = Math.floor(time / 60);
  const minutes = time % 60;
  const hours = Math.floor(time / 60);

  return [hours, minutes, seconds]
    .map((num) => num.toString())
    .map((str) => str.padStart(2, "0"))
    .join(":");
}
