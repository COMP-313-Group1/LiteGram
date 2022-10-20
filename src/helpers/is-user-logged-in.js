import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

export default function IsUserLoggedIn({ user, loggedInPath, location }) {
  if (!user) {
    return <Outlet />;
  }

  if (user) {
    return (
      <Navigate
        to={{
          pathname: loggedInPath,
          state: { from: { location } },
        }}
      />
    );
  }

  return null;
}

IsUserLoggedIn.propTypes = {
  user: PropTypes.object,
  loggedInPath: PropTypes.string.isRequired,
};
