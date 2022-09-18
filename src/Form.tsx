import { css } from "@emotion/react";
import {
  ChangeEventHandler,
  FormEventHandler,
  ReactNode,
  useState,
} from "react";
import useBoolean from "./hooks/useBoolean";
import Input from "./Input";
import { toTotalSeconds } from "./utils";

interface FormProps {
  children?: ReactNode;
  onSubmit: (seconds: number) => void;
  placeholder: string;
}

export default function Form({
  children,
  onSubmit,
  placeholder,
}: FormProps): JSX.Element {
  const [value, setValue] = useState("");
  const [isDirty, getDirty] = useBoolean(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (/^\d{0,6}$/.test(event.target.value)) {
      setValue(event.target.value);
      getDirty();
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(toTotalSeconds(isDirty ? value : placeholder));
  };

  return (
    <form css={formCss} onSubmit={handleSubmit}>
      <Input value={value} onChange={handleChange} placeholder={placeholder} />
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
