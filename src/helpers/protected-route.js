import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function ProtectedRoute({ user, location }) {
  if (user) {
    return <Outlet />;
  }

  if (!user) {
    return (
      <Navigate
        to={{
          pathname: ROUTES.LOGIN,
          state: { from: { location } },
        }}
      />
    );
  }

  return null;
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
};
