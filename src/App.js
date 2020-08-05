import React from "react";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



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
      </Switch>
    </Router>
  );
}

