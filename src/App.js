import React from "react";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import FeedPage from "./Pages/FeedPage";
import UsersPage from "./Pages/UsersPage";
import ProfilePage from "./Pages/ProfilePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

export default function BasicExample() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <PrivateRoute path='/feed'>
          <FeedPage />
        </PrivateRoute>
        <PrivateRoute path='/users'>
          <UsersPage />
        </PrivateRoute>
        <PrivateRoute path='/profile'>
          <ProfilePage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
