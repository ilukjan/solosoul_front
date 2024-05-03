import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useAppState } from '../../providers/AppProvider.hooks';
// import { AppRoutes } from '../../utils/constants';

const PublicRoute = ({ component: Component, ...rest }: { component: React.FC }) => {
  // const { isUserAuthorized } = useAppState();

  // if (isUserAuthorized) {
  //   return <Navigate to={AppRoutes.DASHBOARD} />;
  // }

  return <Component {...rest} />;
};
export default PublicRoute;
