import { useReducer } from "react";

const useToggle = (
  initialValue: boolean
): [boolean, (force?: boolean) => void] => {
  const [bool, toggle] = useReducer((state) => !state, initialValue);

  return [bool, toggle];
};

export default useToggle;
