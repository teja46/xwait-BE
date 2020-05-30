import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import StoreModal from "./components/StoreModal/StoreModal";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

const locUrl = window.location.search.split("page=")[1];

ReactDOM.render(
  <React.StrictMode>
    {locUrl ? <StoreModal storeCode={locUrl} /> : <App />}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
