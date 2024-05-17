import { Conversation, ConversationBot, GetAllConversationsResponse, UserProfileResponse } from '../services/requests';

export type AppProviderContextType = {
  isUserAuthorized: boolean;
  handleSignIn: (username: string, password: string) => void;
  isSignInLoading: boolean;
  signInError: boolean;
  setSignInError: (s: boolean) => void;
  handleSendMessage: (message: string) => void;
  conversations: ConversationsState;
  selectedAppView: string;
  setSelectedAppView: (type: string) => void;
  selectedConversationId: string | null;
  setSelectedConversationId: (value: string | null) => void;
  userProfile: UserProfileResponse | null;
  selectedBotId: string | null;
  setSelectedBotId: (type: string | null) => void;
};

export type Message = {
  fromYou: boolean;
  text: string;
  timestamp: string;
};

export type ConversationsState = Array<{
  id: string;
  bot: ConversationBot;
  messages: Message[];
}>;