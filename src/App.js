import React, { Component } from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";
import { Header, Routes } from './components';

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Header />
        <Routes />
      </HashRouter>
    )
  }
}
