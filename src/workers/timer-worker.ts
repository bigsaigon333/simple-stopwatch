type Message =
  | {
      type: "setInterval";
      interval: number;
    }
  | {
      type: "clearInterval";
    };

onmessage = function (event: MessageEvent<Message>) {
  const { type } = event.data;

  let timeId: number;
  if (type === "setInterval") {
    const { interval } = event.data;
    timeId = setInterval(() => postMessage("tick"), interval);
  } else {
    if (type === "clearInterval") {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clearInterval(timeId!);
    } else {
      throw new Error(`type is invalid: ${type}`);
    }
  }
};

export default {};
