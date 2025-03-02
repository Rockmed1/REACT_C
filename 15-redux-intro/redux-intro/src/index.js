import React from "react";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* connects the application to the redux store. now every component in the store can read and write to it as necessary */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
