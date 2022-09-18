import { css } from "@emotion/react";

export interface TimeCharacterProps {
  color: string;
  visible?: boolean;
  cursor?: boolean;
  char: string;
  marginLeft?: string | number | undefined;
  marginRight?: string | number | undefined;
  fontSize?: "large" | "medium";
  className?: string;
}

export default function TimeCharacter({
  color,
  visible = true,
  cursor = false,
  char,
  marginLeft,
  marginRight,
  fontSize = "medium",
  className,
}: TimeCharacterProps): JSX.Element {
  return (
    <span
      className={className}
      css={css`
        color: ${color};
        ${!visible && "display: none;"}
        ${cursor && "border-right: 1px solid white;"}
        ${marginLeft != null && `margin-left:${marginLeft};`}
        ${marginRight != null && `margin-right:${marginRight};`}
        ${fontSize === "medium" && "font-size: 2rem;"}
        ${fontSize === "large" && "font-size: 3rem;"}
      `}
    >
      {char}
    </span>
  );
}
