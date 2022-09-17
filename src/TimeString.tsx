import { css } from "@emotion/react";
import { useMemo } from "react";

export default function TimeString({ value }: { value: string }): JSX.Element {
  const pad = "0".repeat(6 - value.length);

  const [H1, H2, M1, M2, S1, S2] = useMemo(
    () =>
      [...pad, ...value].map((char, index) => (
        <span
          css={css`
            font-size: 2rem;
            ${index < pad.length ? "color: gray;" : "color: white;"}
          `}
          key={char + index}
        >
          {char}
        </span>
      )),
    [pad, value]
  );

  return (
    <div
      css={css`
        display: inline-block;
      `}
    >
      {H1}
      {H2}
      <span
        css={css`
          ${value.length > 4 ? "color: white;" : "color: gray;"}
        `}
      >
        h
      </span>
      {M1}
      {M2}
      <span
        css={css`
          ${value.length > 2 ? "color: white;" : "color: gray;"}
        `}
      >
        m
      </span>
      {S1}
      {S2}
      <span
        css={css`
          ${value.length > 0 ? "color: white;" : "color: gray;"}
        `}
      >
        s
      </span>
    </div>
  );
}
