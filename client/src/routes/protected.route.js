import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthenticationContext from "../contexts/authentication/context";

const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated, isLoadingUser} = useContext(AuthenticationContext);
  //TODO remove?
  //if(isLoadingUnauthorized) return <div>Loading...</div>
  console.log('isLoading', isLoadingUser)

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;