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
} from './pages';
import { Error, CheckInfo } from '.';
import 'antd/dist/antd.css';
import '../styles.css';

export default function Routes() {
  return (
    <div className="mu-block">
      <Error />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/estates/:estateID/" component={SingleEstate} />
        <Route path="/signup/" component={SignUp} />
        <Route path="/signin/" component={SignIn} />
        <Route path="/profiles/:profileID/" component={Profile} />
        <Route path="/search" component={Search} />
        <Route path="/renters/:renterID" component={SingleRenter} />
        <Route path="/create-profile" component={CreateProfile} />
        <Route path="/check-info" component={CheckInfo} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
