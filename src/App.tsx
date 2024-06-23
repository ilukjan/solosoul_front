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
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';

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
        0.0.5
      </Box>
      <TonConnectUIProvider
        uiPreferences={{ theme: THEME.DARK }}
        manifestUrl={`https://ilukjan.github.io/solosoul_front/tonconnect-manifest.json`}
        actionsConfiguration={{
          twaReturnUrl: 'https://t.me/TheSoloSoulBot/SoloSoul' as `${string}://${string}`,
        }}
      >
        <TelegramProvider>
          <AppProvider>
            <RouterProvider router={router} />
          </AppProvider>
        </TelegramProvider>
      </TonConnectUIProvider>
    </>
  );
}

export default App;
