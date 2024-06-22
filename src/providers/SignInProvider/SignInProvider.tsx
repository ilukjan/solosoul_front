import { ReactNode, createContext, FC, useState, useEffect } from 'react';
import { SignInProviderContextType } from './SignInProvider.types';
import { signIn } from '../../services/requests';
import { APP_STORAGE_KEYS } from '../../services/constants';
import { getCurrentBrowserFingerPrint } from '@rajesh896/broprint.js';
import { toast } from 'react-toastify';

export const SignInContext = createContext<SignInProviderContextType | null>(null);

export const SignInProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isSignInLoading, setSignInLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userAccessToken, setUserAccessToken] = useState<string | null>(null);
  const [signInError, setSignInError] = useState(false);

  useEffect(() => {
    const token_expired_date = window.localStorage.getItem(APP_STORAGE_KEYS.ACCESS_TOKEN_VALID_TILL);
    const access_token = window.localStorage.getItem(APP_STORAGE_KEYS.ACCESS_TOKEN);
    const user_id = window.localStorage.getItem(APP_STORAGE_KEYS.USER_ID);
    if (access_token && token_expired_date && new Date(token_expired_date) > new Date()) {
      setUserAccessToken(access_token);
      setUserId(user_id);
      setSignInLoading(false);
    } else {
      window.localStorage.removeItem(APP_STORAGE_KEYS.ACCESS_TOKEN);
      window.localStorage.removeItem(APP_STORAGE_KEYS.ACCESS_TOKEN_VALID_TILL);

      getCurrentBrowserFingerPrint().then((fingerprint) => {
        console.log('handleSignIn(', fingerprint);
        handleSignIn(fingerprint);
      });
    }
  }, []);

  const handleSignIn = (userid: string) => {
    setSignInLoading(false);

    signIn({ userid })
      .then((response) => {
        console.log('signIn resp', response);
        setUserAccessToken(response.access_token);
        setUserId(response.user_id);
        window.localStorage.setItem(APP_STORAGE_KEYS.ACCESS_TOKEN, response.access_token);
        window.localStorage.setItem(APP_STORAGE_KEYS.USER_ID, response.user_id);
        window.localStorage.setItem(APP_STORAGE_KEYS.ACCESS_TOKEN_VALID_TILL, response.token_valid_till);
        setSignInLoading(false);
        toast(`Successfully signed in`, { type: 'success', hideProgressBar: true });
      })
      .catch((err) => {
        console.error('sign in error: ', err);
        toast(`Sign in error: ${err}`, { type: 'error', hideProgressBar: true });
        setSignInError(true);
      })
      .finally(() => {
        // setSignInLoading(false);
      });
  };

  const value: SignInProviderContextType = {
    userAccessToken,
    userId,
    handleSignIn,
    isSignInLoading,
    signInError,
    setSignInError,
  };
  return <SignInContext.Provider value={value}>{children}</SignInContext.Provider>;
};
