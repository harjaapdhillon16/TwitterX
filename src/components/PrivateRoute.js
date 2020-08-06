import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props, children) => {

  return (
    <>
      {localStorage.getItem("uid") !== null ? (
        <Route {...props} render={() => children} />
      ) : (
        <Redirect to='/' />
      )}
    </>
  );
};
export default PrivateRoute;
