import React from 'react';
import { Redirect, Route } from 'react-router';

/**
 * Component for handling private routes
 */

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    window.localStorage.getItem('accessToken')
      ? <Component {...props} />
      : <Redirect to="/login" />
  )}
  />
);

export default PrivateRoute;
