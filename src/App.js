import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header, Routes } from './components';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    )
  }
}
