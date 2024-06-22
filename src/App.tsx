import React from 'react';
import './App.css';
import SignIn from './SignIn';
import { AppProvider } from './providers/AppProvider';
import PublicRoute from './components/routes/PublicRoute';
import PrivateRoute from './components/routes/PrivateRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProvideRoute from './components/routes/ProvideRoute';
import Main from './components/Main/Main';
import { TelegramProvider } from './providers/TelegramProvider/TelegramProvider';

export enum AppRoutes {
  HOME = '*',
  SIGN_IN = '/sign-in',
  MAIN = '/main',
}
const router = createBrowserRouter([
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
    <TelegramProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </TelegramProvider>
  );
}

export default App;
