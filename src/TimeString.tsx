import { css } from "@emotion/react";
import TimeCharacter, { TimeCharacterProps } from "./TimeCharacter";

export default function TimeString({
  value,
  focused = false,
  dirty = false,
  onClick,
}: {
  value: string;
  focused?: boolean;
  dirty?: boolean;
  onClick?: () => void;
}): JSX.Element {
  const pad = "0".repeat(6 - value.length);

  const zeroPad = !dirty ? /^0*/.exec(value)?.[0] ?? "" : "";

  const [H1, H2, M1, M2, S1, S2] = [...pad, ...value].map<TimeCharacterProps>(
    (char, index) => ({
      color: index < pad.length ? "gray" : "white",
      visible:
        dirty ||
        index >= zeroPad.length ||
        (index == 5 && zeroPad.length === 6),
      cursor: index === 5 && focused,
      char,
      index,
      fontSize: "large",
    })
  );

  const hourMeasure: TimeCharacterProps = {
    color: value.length > 4 ? "white" : "gray",
    visible: dirty || zeroPad.length < 2,
    marginLeft: "1px",
    marginRight: "2px",
    char: "h",
    fontSize: "medium",
  };

  const minuteMeasure: TimeCharacterProps = {
    color: value.length > 2 ? "white" : "gray",
    visible: dirty || zeroPad.length < 4,
    marginLeft: "1px",
    marginRight: "2px",
    char: "m",
    fontSize: "medium",
  };

  const secondMeasure: TimeCharacterProps = {
    color: value.length > 0 ? "white" : "gray",
    visible: dirty || zeroPad.length <= 6,
    marginLeft: focused ? "1px" : 0,
    marginRight: "2px",
    char: "s",
    fontSize: "medium",
  };

  return (
    <div
      css={css`
        display: inline-flex;
        font-size: 2rem;
        line-height: 1;
        align-items: flex-end;
        font-weight: 500;

        box-sizing: border-box;
        height: 4rem;

        ${dirty
          ? focused
            ? css`
                border-bottom: 2px solid white;
                padding-bottom: 10px;
              `
            : css`
                border-bottom: 1px solid gray;
                padding-bottom: 11px;
              `
          : css`
              padding-bottom: 12px;
            `}
      `}
      onClick={onClick}
    >
      {[H1, H2, hourMeasure, M1, M2, minuteMeasure, S1, S2, secondMeasure].map(
        (props, index) => (
          <TimeCharacter key={props.char + index} {...props} />
        )
      )}
    </div>
  );
}
