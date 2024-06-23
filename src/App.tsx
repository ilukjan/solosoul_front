import React from 'react';
import './App.css';
import SignIn from './SignIn';
import { AppProvider } from './providers/AppProvider';
import PublicRoute from './components/routes/PublicRoute';
import PrivateRoute from './components/routes/PrivateRoute';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import ProvideRoute from './components/routes/ProvideRoute';
import Main from './components/Main/Main';
import { TelegramProvider } from './providers/TelegramProvider/TelegramProvider';
import { Box } from '@mui/material';

export enum AppRoutes {
  HOME = '*',
  SIGN_IN = '/solosoul_front/sign-in',
  MAIN = '/solosoul_front/main',
}
const router = createHashRouter([
  {
    path: AppRoutes.HOME,
    element: <ProvideRoute />,
  },
  {
    path: AppRoutes.SIGN_IN,
    element: <PublicRoute component={SignIn} />,
  },
  {
    path: AppRoutes.MAIN,
    element: <PrivateRoute component={Main} />,
  },
]);

function App() {
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 2,
          left: 2,
          color: 'gray',
          zIndex: 9999,
          fontSize: '6px',
        }}
      >
        0.0.3
      </Box>
      <TelegramProvider>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </TelegramProvider>
    </>
  );
}

export default App;
