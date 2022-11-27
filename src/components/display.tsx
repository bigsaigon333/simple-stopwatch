import { toTimeTuple } from "../utils/utils";

interface Properties {
  time: number;
}

const Display = ({ time }: Properties) => {
  const [hours, minutes, seconds] = toTimeTuple(time);

  return (
    <div>
      {hours && (
        <>
          <span>{hours}</span>
          <span>h</span>
        </>
      )}
      {minutes && (
        <>
          <span>{minutes}</span>
          <span>m</span>
        </>
      )}
      {seconds && (
        <>
          <span>{seconds}</span>
          <span>s</span>
        </>
      )}
    </div>
  );
};

export default Display;
