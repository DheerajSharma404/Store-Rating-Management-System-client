import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import ModalContextProvider from "./contexts/ModalContext.jsx";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
