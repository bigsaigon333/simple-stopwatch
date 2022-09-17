import { css } from "@emotion/react";

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

  const [H1, H2, M1, M2, S1, S2] = [...pad, ...value].map((char, index) => (
    <span
      css={css`
        font-size: 3rem;
        ${index < pad.length ? "color: gray;" : "color: white;"}
        ${index === 5 && focused && "border-right: 1px solid white;"}
      `}
    >
      {char}
    </span>
  ));

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
      {H1}
      {H2}
      <span
        css={css`
          margin-left: 1px;
          margin-right: 2px;
          ${value.length > 4 ? "color: white;" : "color: gray;"};
        `}
      >
        h
      </span>
      {M1}
      {M2}
      <span
        css={css`
          margin-left: 1px;
          margin-right: 2px;
          ${value.length > 2 ? "color: white;" : "color: gray;"}
        `}
      >
        m
      </span>
      {S1}
      {S2}
      <span
        css={css`
          ${!focused && "margin-left: 1px;"}
          margin-right: 2px;
          ${value.length > 0 ? "color: white;" : "color: gray;"}
        `}
      >
        s
      </span>
    </div>
  );
}
