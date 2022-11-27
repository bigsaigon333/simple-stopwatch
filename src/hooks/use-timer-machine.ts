import { useMachine } from "@xstate/react";
import timerMachine from "../machine/timer-machine";

const useTimerMachine = () => {
  return useMachine(timerMachine);
};

export default useTimerMachine;
