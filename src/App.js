import React, { Component } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Header, Routes } from "./components";
import { setAuthToken } from "./redux/helpers";
import { loadUser } from "./redux/actions";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Header />
          <Routes />
        </HashRouter>
      </Provider>
    );
  }
}
