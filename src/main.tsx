import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import { TimerProvider } from "./contexts/timer-context";
import "./styles/index.css";

createRoot(document.querySelector("#root") as HTMLElement).render(
  <StrictMode>
    <TimerProvider>
      <App />
    </TimerProvider>
  </StrictMode>
);
