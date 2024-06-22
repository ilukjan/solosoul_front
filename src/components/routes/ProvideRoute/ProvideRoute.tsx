import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../../App';
import { useSignIn } from '../../../providers/SignInProvider/SignInProvider.hooks';

const ProvideRoute = () => {
  const { userAccessToken } = useSignIn();

  if (userAccessToken) {
    return <Navigate to={AppRoutes.MAIN} />;
  }

  if (!userAccessToken) {
    return <Navigate to={AppRoutes.SIGN_IN} />;
  }

  return <h1>Loading...</h1>;
};

export default ProvideRoute;
