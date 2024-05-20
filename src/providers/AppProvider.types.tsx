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
  advertisement: string | null;
  setAdvertisement: (type: string | null) => void;
  tips: string[];
  advertisementVisibility: boolean;
  setAdvertisementVisibility: (s: boolean) => void;
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

export type SocketReceiveMessageType = {
  ConversationId: string;
  Id: string;
  UserId: string;
  BotId: string;
  FromId: string;
  Timestamp: string;
  Status: number;
  Message: string;
};

export type SocketSystemMessageType = {
  UserId?: string;
  Id: string;
  MessageType: number;
  Timestamp: string;
  Message: string;
};
