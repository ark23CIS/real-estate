import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  Home,
  SingleEstate,
  SignUp,
  SignIn,
  Profile,
  Estates,
  NotFound,
} from "./components/pages";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/estates/" component={Estates} />
        <Route exact path="/estates/:estateID/" component={SingleEstate} />
        <Route exact path="/signup/" component={SignUp} />
        <Route exact path="/signin/" component={SignIn} />
        <Route exact path="/profiles/:profileID/" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
