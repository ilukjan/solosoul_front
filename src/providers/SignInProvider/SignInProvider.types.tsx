export type SignInProviderContextType = {
  userAccessToken: string | null;
  userId: string | null;
  handleSignIn: (username: string, password: string) => void;
  isSignInLoading: boolean;
  signInError: boolean;
  setSignInError: (s: boolean) => void;
};
