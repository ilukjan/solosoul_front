import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppState } from '../../../providers/AppProvider.hooks';

const PrivateRoute = ({ component: Component, ...rest }: { component: React.FC }) => {
  // const { isUserAuthorized } = useAppState();

  // if (!isUserAuthorized) {
  //   return <Navigate to={AppRoutes.SIGN_IN} />;
  // }

  return <Component {...rest} />;
};
export default PrivateRoute;
