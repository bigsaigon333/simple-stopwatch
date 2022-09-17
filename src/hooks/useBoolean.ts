import { useCallback, useState } from "react";

const useBoolean = (
  initialValue: boolean
): [boolean, () => void, () => void, (force?: boolean) => void] => {
  const [bool, setBool] = useState(initialValue);
  const setTrue = useCallback(() => setBool(true), [setBool]);
  const setFalse = useCallback(() => setBool(false), [setBool]);
  const toggle = useCallback(
    (force?: boolean) => setBool((prev) => (force == null ? !prev : force)),
    [setBool]
  );

  return [bool, setTrue, setFalse, toggle];
};

export default useBoolean;
