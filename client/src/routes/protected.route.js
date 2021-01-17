import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import AuthenticationContext from "../contexts/authentication/context";

const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated, isLoading } = useContext(AuthenticationContext);
  if(isLoading) return <div>Loading...</div>
  console.log('isLoading', isLoading)
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;