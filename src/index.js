import React from "react";
import ReactDOM from "react-dom";
import store from "./store/store";
import "./style/main.scss";
import App from "./App";

let reRenderTree = () => {
  ReactDOM.render(
    <App state={store.getState()} dispatch={store.dispatch.bind(store)} />,
    document.getElementById("root")
  );
};

reRenderTree(store.getState());
store.subscribe(reRenderTree);
