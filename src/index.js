import React from "react";
import ReactDOM from "react-dom";
import store from "./store/store";
import "./style/main.scss";
import App from "./App";

let reRenderTree = () => {
  ReactDOM.render(
    <App
      state={store.getState()}
      addUser={store.addUser.bind(store)}
      addPost={store.addPost.bind(store)}
      changePostText={store.changePostText.bind(store)}
    />,
    document.getElementById("root")
  );
};

reRenderTree(store.getState());
store.subscribe(reRenderTree);
