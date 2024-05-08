import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppState } from '../../../providers/AppProvider.hooks';
import { AppRoutes } from '../../../App';
// import { useAppState } from '../../providers/AppProvider.hooks';
// import { AppRoutes } from '../../utils/constants';


const ProvideRoute = () => {
  const { isUserAuthorized } = useAppState();


  if (isUserAuthorized) {
    return <Navigate to={AppRoutes.MAIN} />;
  }

  if (!isUserAuthorized) {
    return <Navigate to={AppRoutes.SIGN_IN} />;
  }

  return <h1>Loading...</h1>
};

export default ProvideRoute;
