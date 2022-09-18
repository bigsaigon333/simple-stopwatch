import { css } from "@emotion/react";
import {
  ChangeEventHandler,
  FormEventHandler,
  ReactNode,
  useState,
} from "react";
import Input from "./Input";
import { toTotalSeconds } from "./utils";

interface FormProps {
  children?: ReactNode;
  onSubmit: (seconds: number) => void;
}

export default function Form({ children, onSubmit }: FormProps): JSX.Element {
  const [value, setValue] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (/^\d{0,6}$/.test(event.target.value)) {
      setValue(event.target.value);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(toTotalSeconds(value));
  };

  return (
    <form css={formCss} onSubmit={handleSubmit}>
      <Input value={value} onChange={handleChange} />
      {children}
    </form>
  );
}

export const formCss = css`
  width: 25rem;
  display: flex;
  row-gap: 2rem;
  flex-direction: column;
`;
