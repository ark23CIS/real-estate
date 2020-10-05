import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Home,
  SingleEstate,
  SignUp,
  SignIn,
  Profile,
  NotFound,
  SingleRenter,
  Search,
  CreateProfile,
  Offers,
} from './pages';
import { Error, CheckInfo, Success } from '.';
import 'antd/dist/antd.css';
import '../styles.css';

export default function Routes() {
  return (
    <div className="mu-block">
      <Error />
      <Success />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/estates/:estateID/" component={SingleEstate} />
        <Route exact path="/signup/" component={SignUp} />
        <Route exact path="/signin/" component={SignIn} />
        <Route exact path="/profiles/:profileID/" component={Profile} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/renters/:renterID" component={SingleRenter} />
        <Route exact path="/create-profile" component={CreateProfile} />
        <Route exact path="/check-info" component={CheckInfo} />
        <Route exact path="/offers" component={Offers} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
