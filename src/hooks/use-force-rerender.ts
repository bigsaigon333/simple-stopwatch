import { useCallback, useState } from "react";

const useForceRerender = (): [number, () => void] => {
  const [key, setNumber] = useState(0);

  const rerender = useCallback(
    () => setNumber((previous) => previous + 1),
    [setNumber]
  );

  return [key, rerender];
};

export default useForceRerender;
