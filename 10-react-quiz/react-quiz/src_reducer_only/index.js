import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { QuizProvider } from "./context/QuizContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
// import BankAccount from "./components/BankAccount";

root.render(
  <React.StrictMode>
    <App />
    {/* <BankAccount /> */}
  </React.StrictMode>
);
