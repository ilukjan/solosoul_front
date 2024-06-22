import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppState } from '../../../providers/AppProvider/AppProvider.hooks';
import { AppRoutes } from '../../../App';
import { useSignIn } from '../../../providers/SignInProvider/SignInProvider.hooks';
// import { useAppState } from '../../providers/AppProvider.hooks';
// import { AppRoutes } from '../../utils/constants';

const PublicRoute = ({ component: Component, ...rest }: { component: React.FC }) => {
  const { userAccessToken } = useSignIn();

  if (userAccessToken) {
    return <Navigate to={AppRoutes.MAIN} />;
  }

  return <Component {...rest} />;
};
export default PublicRoute;
