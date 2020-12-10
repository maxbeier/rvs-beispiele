import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { useStore } from './Store';

const ProtectedRoute = ({ component: Component, ...routeProps }) => {
  const [{ isLoggedIn }] = useStore();
  return (
    <Route
      render={props => isLoggedIn
        ? <Component {...props} />
        : <p className="alert alert-danger">Nur für eingeloggte Nutzer sichtbar.</p>
      }
      {...routeProps}
    />
  );
}

ProtectedRoute.propTypes = {
  ...Route.PropTypes,
  component: PropTypes.func.isRequired,
};

export default ProtectedRoute;
