import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import boardGameApp from "./reducers";

const store = createStore(boardGameApp);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
