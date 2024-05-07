export type AppProviderContextType = {
  isUserAuthorized: boolean;
  handleSignIn: (username: string, password: string) => void;
  isSignInLoading: boolean;
  signInError: boolean;
  setSignInError: (s: boolean) => void;
  handleSendMessage: (message: string) => void;
  messages: Message[];
};

export type Message = {
  fromYou: boolean;
  text: string;
};
