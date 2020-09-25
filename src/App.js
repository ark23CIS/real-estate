import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { teal, orange } from "@material-ui/core/colors";
import { Header, Routes } from "./components";
import { setAuthToken } from "./redux/helpers";
import { loadUser } from "./redux/actions";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#52c7b8",
      main: "#009688",
      dark: "#00675b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffd95b",
      main: "#ffa726",
      dark: "#c77800",
      contrastText: "#000",
    },
    openTitle: teal["700"],
    protectedTitle: orange["700"],
    type: "light",
  },
});

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <HashRouter>
            <Header />
            <Routes />
          </HashRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
