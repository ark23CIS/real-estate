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
    <div>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/estates/" component={Estates} />
        <Route path="/estates/:estateID/" component={SingleEstate} />
        <Route path="/signup/" component={SignUp} />
        <Route path="/signin/" component={SignIn} />
        <Route path="/profiles/:profileID/" component={Profile} />
        <Route component={NotFound} />
        </Switch>
    </div>
  );
}
