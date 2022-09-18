import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TimerProvider } from "./contexts/timerContext";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TimerProvider>
      <App />
    </TimerProvider>
  </React.StrictMode>
);
