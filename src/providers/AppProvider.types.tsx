import { Conversation, GetAllConversationsResponse, UserProfileResponse } from '../services/requests';

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
  userProfile: UserProfileResponse | null;
};

export type Message = {
  fromYou: boolean;
  text: string;
};
