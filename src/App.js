import React from "react";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import FeedPage from "./Pages/FeedPage";
import UsersPage from "./Pages/UsersPage";
import ProfilePage from "./Pages/ProfilePage";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


export default function BasicExample() {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path='/'>
          <Login />
        </PublicRoute>
        <PublicRoute path='/signup'>
          <Signup />
        </PublicRoute>
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
