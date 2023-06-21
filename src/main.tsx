import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChatProvider } from "./modules/mesasge/context/index.tsx";
import { TourProvider } from "@reactour/tour";
import { steps } from "./modules/tours/config.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChatProvider>
      <TourProvider steps={steps} defaultOpen={true} className="tour">
        <App />
      </TourProvider>
    </ChatProvider>
  </React.StrictMode>
);
