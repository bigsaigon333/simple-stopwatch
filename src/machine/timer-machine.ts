import { createMachine } from "xstate";

const timerMachine = createMachine(
  {
    id: "timer",
    predictableActionArguments: true,
    initial: "edit",
    context: {
      userInputTime: 0,
    },
    states: {
      edit: {
        type: "atomic",
        entry(context) {
          return { ...context, userInputTime: 0 };
        },
        on: {
          START: {
            target: "ticking",
            cond: "userInputTimeValid",
            actions(context, event) {
              return { ...context, userInputTime: event.userInputTime };
            },
          },
          RESET: { target: "edit" },
        },
      },
      ticking: {
        type: "atomic",
        on: {
          PAUSE: { target: "paused" },
          STOP: { target: "edit" },
          DONE: { target: "done" },
        },
      },
      paused: {
        type: "atomic",
        on: {
          RESUME: { target: "ticking" },
          STOP: { target: "edit" },
        },
      },
      done: {
        type: "atomic",
        on: {
          OK: { target: "edit" },
          STOP: { target: "edit" },
        },
      },
    },
  },
  {
    guards: {
      userInputTimeValid: (_, event) => {
        return event.userInputTime > 0;
      },
    },
  }
);

export default timerMachine;
