import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// bugsnag
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import { BUGSNAG_API_KEY, BUGSNAG_RELEASE_STAGE } from "./constants/bugsnag";

const el = document.getElementById("root");
if (el) {
  Bugsnag.start({
    apiKey: BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact(React)],
    releaseStage: BUGSNAG_RELEASE_STAGE,
  });

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    el
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}
