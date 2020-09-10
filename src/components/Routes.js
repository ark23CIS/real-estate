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
  SingleRenter,
  Renters,
  Search,
} from "./pages";
import Error from "./Error";
import "../styles.css";

export default function Routes() {
  return (
    <div>
      <Error />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/estates/" component={Estates} />
        <Route path="/estates/:estateID/" component={SingleEstate} />
        <Route path="/signup/" component={SignUp} />
        <Route path="/signin/" component={SignIn} />
        <Route path="/renters/" component={Renters} />
        <Route path="/profiles/:profileID/" component={Profile} />
        <Route path="/search" component={Search} />
        <Route path="/renters/:renterID" component={SingleRenter} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
