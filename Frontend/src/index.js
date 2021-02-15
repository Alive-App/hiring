import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "./common/modal";
import History from "./History";
import reportWebVitals from "./reportWebVitals";
import "../src/main.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="sans-serif">
        <Route path="/" exact={true} component={App} />
      </div>
      <Switch>
        <Route path="/modal" component={Modal} />
        <Route path="/history" component={History} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
