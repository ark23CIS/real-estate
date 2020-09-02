import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Home,
  SingleEstate,
  SignUp,
  SignIn,
  Profile,
  Estates,
  NotFound,
} from "./pages";
import Header from "./Header";
import "../styles.css";

export default function Routes() {
  return (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/estates/" component={Estates} />
        <Route exact path="/estates/:estateID/" component={SingleEstate} />
        <Route exact path="/signup/" component={SignUp} />
        <Route exact path="/signin/" component={SignIn} />
        <Route exact path="/profiles/:profileID/" component={Profile} />
        <Route component={NotFound} />
    </Switch>
  );
}
