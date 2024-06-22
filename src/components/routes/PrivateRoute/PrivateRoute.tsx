import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../../App';
import { useSignIn } from '../../../providers/SignInProvider/SignInProvider.hooks';

const PrivateRoute = ({ component: Component, ...rest }: { component: React.FC }) => {
  const { userAccessToken } = useSignIn();

  if (!userAccessToken) {
    return <Navigate to={AppRoutes.SIGN_IN} />;
  }

  return <Component {...rest} />;
};
export default PrivateRoute;
