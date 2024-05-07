import React from 'react';
import './App.css';
import SignIn from './SignIn';
import { AppProvider } from './providers/AppProvider';
import PublicRoute from './components/routes/PublicRoute';
import PrivateRoute from './components/routes/PrivateRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProvideRoute from './components/routes/ProvideRoute';
import Chat from './Chat';

export enum AppRoutes {
  HOME = '*',
  SIGN_IN = '/sign-in',
  CHAT = '/chat',
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
    path: AppRoutes.CHAT,
    element: <PrivateRoute component={Chat} />,
  },
]);

console.log('0.000002');

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
