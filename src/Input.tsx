import { css } from "@emotion/react";
import { InputHTMLAttributes, useRef } from "react";
import useBoolean from "./hooks/useBoolean";
import TimeString from "./TimeString";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  placeholder: string;
}

export default function Input({
  value,
  onChange,
  placeholder,
}: InputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, focus, blur] = useBoolean(false);

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <TimeString
        value={value}
        dirty
        placeholder={placeholder}
        focused={isFocused}
        onClick={() => {
          if (inputRef.current == null) {
            return;
          }

          inputRef.current.focus();
          focus();
        }}
      />
      <input
        ref={inputRef}
        css={css`
          height: 0px;
          left: 20px;
          position: absolute;
          opacity: 0;
          top: 20px;
          width: 0;
          z-index: -2;
        `}
        pattern="\d*"
        value={value}
        onChange={onChange}
        onBlur={blur}
        onFocus={(e) => {
          focus();
          e.target.setSelectionRange(
            e.target.value.length,
            e.target.value.length
          );
        }}
      />
    </div>
  );
}
