import Form from "./Form";
import { TimerProvider } from "./timerContext";

export default function App(): JSX.Element {
  return (
    <TimerProvider>
      <Form />
    </TimerProvider>
  );
}
