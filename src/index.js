import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/redux-store";
import "./style/main.scss";
import App from "./App";

let reRenderTree = (state) => {
  ReactDOM.render(
    <BrowserRouter>
      <App state={state} dispatch={store.dispatch.bind(store)} />
    </BrowserRouter>,
    document.getElementById("root")
  );
};

reRenderTree(store.getState());
store.subscribe(() => {
  let state = store.getState();
  reRenderTree(state);
});
