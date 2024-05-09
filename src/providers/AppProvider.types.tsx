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
  timestamp: string;
};

export type SocketResponseMessage = {
  conversation_id: string;
  id: string;
  user_id: string;
  bot_id: string;
  from_id: string;
  timestamp: string;
  status: number;
  message: string;
};
