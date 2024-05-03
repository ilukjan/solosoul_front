import React from 'react';
import './App.css';
import SignIn from './SignIn';
import { AppProvider } from './providers/AppProvider';



// export enum AppRoutes {
//   SIGN_IN = '/sign-in',
//   CHAT = '/CHAT',
// }
// const router = createBrowserRouter([

//   {
//     path: AppRoutes.SIGN_IN,
//     element: <PublicRoute component={SignIn} />,
//   },
//   {
//     path: AppRoutes.DASHBOARD,
//     element: <PrivateRoute component={Dashboard} />,
//   },
//   { path: AppRoutes.PRIVACY, element: <PrivacyPolicy /> },
//   { path: AppRoutes.TERMS, element: <TermsOfUse /> },
// ]);

function App() {
  return (
    <AppProvider>
      <SignIn />
    </AppProvider>
  );
}

export default App;
