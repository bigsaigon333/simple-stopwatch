import { useCallback, useState } from "react";

const useForceRerender = () => {
  const [, setNumber] = useState(0);

  const trigger = useCallback(() => setNumber((prev) => prev + 1), [setNumber]);

  return trigger;
};

export default useForceRerender;
