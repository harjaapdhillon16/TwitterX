import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = (props, children) => {

  return (
    <>
      {localStorage.getItem("uid") === null ? (
        <Route {...props} render={() => children} />
      ) : (
        <Redirect to='/feed' />
      )}
    </>
  );
};
export default PublicRoute;