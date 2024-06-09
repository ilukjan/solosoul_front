import React from 'react';
import './App.css';
// import SignIn from './SignIn';
import { AppProvider } from './providers/AppProvider/AppProvider';
// import PublicRoute from './components/routes/PublicRoute';
// import PrivateRoute from './components/routes/PrivateRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import ProvideRoute from './components/routes/ProvideRoute';
import Main from './components/Main/Main';
import { SignInProvider } from './providers/SignInProvider/SignInProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export enum AppRoutes {
  HOME = '*',
  SIGN_IN = '/sign-in',
  MAIN = '/main',
}
const router = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    element: <Main />,
  },
  // {
  //   path: AppRoutes.HOME,
  //   element: <ProvideRoute />,
  // },
  // {
  //   path: AppRoutes.SIGN_IN,
  //   element: <PublicRoute component={SignIn} />,
  // },
  // {
  //   path: AppRoutes.MAIN,
  //   element: <PrivateRoute component={Main} />,
  // },
]);

console.log('0.000004');

function App() {
  return (
    <SignInProvider>
      <AppProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AppProvider>
    </SignInProvider>
  );
}

export default App;
