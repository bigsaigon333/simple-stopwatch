import { css } from "@emotion/react";
import { toTimeTuple } from "../utils/utils";

interface Properties {
  time: number;
}

const HOUR_MEASURE = "h";
const MINUTE_MEASURE = "m";
const SECOND_MEASURE = "s";

const Display = ({ time }: Properties) => {
  const [hours, minutes, seconds] = toTimeTuple(time);

  return (
    <div>
      {[
        ...hours,
        HOUR_MEASURE,
        ...minutes,
        MINUTE_MEASURE,
        ...seconds,
        SECOND_MEASURE,
      ].map((char, index) => (
        <Display.Char key={char + index} char={char} />
      ))}
    </div>
  );
};

export default Display;

// eslint-disable-next-line react/display-name
Display.Char = ({ char }: { char: string }): JSX.Element => {
  const isNumber = /^\d$/.test(char);

  return (
    <span
      css={css`
        font-size: ${isNumber ? "3rem" : "2rem"};
        font-weight: 500;
      `}
    >
      {char}
    </span>
  );
};
