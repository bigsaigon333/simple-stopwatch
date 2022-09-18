import { css } from "@emotion/react";
import TimeCharacter, { TimeCharacterProperties } from "./time-character";

interface TimeStringProperties {
  value: string;
  focused?: boolean;
  dirty?: boolean;
  placeholder?: string;
  onClick?: () => void;
}

export default function TimeString({
  value,
  focused = false,
  dirty = false,
  placeholder = "0".repeat(6),
  onClick,
}: TimeStringProperties): JSX.Element {
  const zeroPad = placeholder.slice(0, 6 - value.length);

  const [H1, H2, M1, M2, S1, S2] = [
    ...zeroPad,
    ...value,
  ].map<TimeCharacterProperties>((char, index) => ({
    color: index < zeroPad.length ? "gray" : "white",
    visible: dirty || index >= zeroPad.length,
    cursor: dirty && focused && index === 5,
    char,
    fontSize: "large",
  }));

  const hourMeasure: TimeCharacterProperties = {
    color: value.length > 4 ? "white" : "gray",
    visible: dirty || value.length > 4,
    marginLeft: "1px",
    marginRight: "2px",
    char: "h",
    fontSize: "medium",
  };

  const minuteMeasure: TimeCharacterProperties = {
    color: value.length > 2 ? "white" : "gray",
    visible: dirty || value.length > 2,
    marginLeft: "1px",
    marginRight: "2px",
    char: "m",
    fontSize: "medium",
  };

  const secondMeasure: TimeCharacterProperties = {
    color: value.length > 0 ? "white" : "gray",
    visible: dirty || value.length > 0,
    marginLeft: focused ? 0 : "1px",
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
        (properties, index) => (
          <TimeCharacter key={properties.char + index} {...properties} />
        )
      )}
    </div>
  );
}
