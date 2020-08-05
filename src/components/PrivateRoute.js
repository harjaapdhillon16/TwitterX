import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = (props, children) => {
  return <Route
    {...props}
    render={props=>{
        
    }}
   />;
};
export default PrivateRoute;
