import { Conversation, GetAllConversationsResponse } from '../services/requests';

export type AppProviderContextType = {
  isUserAuthorized: boolean;
  handleSignIn: (username: string, password: string) => void;
  isSignInLoading: boolean;
  signInError: boolean;
  setSignInError: (s: boolean) => void;
  handleSendMessage: (message: string) => void;
  chatMessages: Message[];
  setChatMessages: (messages: Message[]) => void;
  userConversations: GetAllConversationsResponse | null;
  selectedAppView: string;
  setSelectedAppView: (type: string) => void;
  selectedConversation: Conversation | null;
  setSelectedConversation: (value: Conversation | null) => void;
};

export type Message = {
  fromYou: boolean;
  text: string;
};

export const APP_VIEW = {
  MAIN: 'main',
  CHAT: 'chat',
  SETTINGS: 'settings',
};
