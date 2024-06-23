import {
  Conversation,
  ConversationBot,
  GetAllConversationsResponse,
  GetBotToAddResponse,
  UserProfileResponse,
} from '../services/requests';

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
  isAddBotOpen: boolean;
  setAddBotOpen: (s: boolean) => void;
  isAddBotLoading: boolean;
  setAddBotLoading: (s: boolean) => void;
  handleFetchNewBot: (s: 'decline' | 'accept') => void;
  addBotData: GetBotToAddResponse | null;
  fetchUserData: () => void;
  handleUpdateSettings: (
    search_gender: string,
    search_age_from: number,
    search_age_to: number,
    nationality: string,
    figure: string
  ) => void;
  chatPhoto: string | null;
  handleAddFile: (s: string) => void;
  messagesLimit: number;
  setMessagesLimit: (v: number) => void;
  handlePurchase: () => void;
};

export type Message = {
  fromYou: boolean;
  text: string;
  timestamp: string;
  image?: string;
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

export type SocketReceiveMediaMessageType = {
  Image: string;
  ConversationId: string;
  Id: string;
  UserId: string;
  BotId: string;
  FromId: string;
  Timestamp: string;
  Status: number;
};

export type SocketSystemMessageType = {
  UserId?: string;
  Id: string;
  MessageType: number;
  Timestamp: string;
  Message: string;
};
