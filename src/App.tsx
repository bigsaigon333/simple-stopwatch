import Page from "./Page";
import { TimerProvider } from "./timerContext";

export default function App(): JSX.Element {
  return (
    <TimerProvider>
      <Page />
    </TimerProvider>
  );
}
