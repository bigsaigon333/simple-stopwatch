import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./app";
import { TimerProvider } from "./contexts/timer-context";
import "./styles/index.css";

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <TimerProvider>
        <App />
      </TimerProvider>
    </HelmetProvider>
  </React.StrictMode>
);
