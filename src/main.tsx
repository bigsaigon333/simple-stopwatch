import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { TimerProvider } from "./contexts/timer-context";
import "./styles/index.css";

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <TimerProvider>
      <App />
    </TimerProvider>
  </React.StrictMode>
);
