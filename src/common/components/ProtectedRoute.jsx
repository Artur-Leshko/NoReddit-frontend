import React from 'react';
import { Navigate, Outlet, useLocation, } from 'react-router-dom';
import { useSelector, } from 'react-redux';
import { userSelector, } from '../../store/selectors';

export const ProtectedRoute = ({ redirectPath = '/login', children, }) => {
  const currentUser = useSelector(userSelector);
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to={redirectPath} state={{ from: location, }} replace />;
  }

  return children ? children : <Outlet />;
};
