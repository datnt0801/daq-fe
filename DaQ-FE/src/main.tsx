import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NuqsAdapter } from "nuqs/adapters/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NuqsAdapter>
        <App />
      </NuqsAdapter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        newestOnTop={true}
        style={{ zIndex: 1000 }}
        className="text-white text-shadow-lg"
      />
    </BrowserRouter>
  </StrictMode>
);
