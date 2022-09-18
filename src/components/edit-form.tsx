import { css } from "@emotion/react";
import {
  ChangeEventHandler,
  FormEventHandler,
  ReactNode,
  useState,
} from "react";
import useBoolean from "../hooks/use-boolean";
import Input from "./input";
import { toTotalSeconds } from "../utils/utils";

interface EditFormProperties {
  children?: ReactNode;
  onSubmit: (seconds: number) => void;
  placeholder: string;
}

export default function EditForm({
  children,
  onSubmit,
  placeholder,
}: EditFormProperties): JSX.Element {
  const [value, setValue] = useState("");
  const [isDirty, getDirty] = useBoolean(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (/^\d{0,6}$/.test(event.target.value)) {
      setValue(event.target.value);
      getDirty();
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit(toTotalSeconds(isDirty ? value : placeholder));
  };

  return (
    <form css={formCss} onSubmit={handleSubmit}>
      <Input
        value={value}
        onChange={handleChange}
        {...(!isDirty && { placeholder })}
      />
      {children}
    </form>
  );
}

export const formCss = css`
  width: 17rem;

  display: flex;
  row-gap: 2rem;
  flex-direction: column;
`;
