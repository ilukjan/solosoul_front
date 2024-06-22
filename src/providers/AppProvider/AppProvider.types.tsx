import { ConversationBot, GetBotToAddResponse, UserProfileResponse } from '../../services/requests';

export type AppProviderContextType = {
  handleSendMessage: (message: string) => void;
  conversations: ConversationsState;
  selectedAppView: string;
  setSelectedAppView: (type: string) => void;
  selectedConversationId: string | null;
  setSelectedConversationId: (value: string | null) => void;
  userProfile: UserProfileResponse | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfileResponse | null>>;
  selectedBotId: string | null;
  setSelectedBotId: (type: string | null) => void;
  advertisement: string | null;
  setAdvertisement: (type: string | null) => void;
  tips: string[];
  advertisementVisibility: boolean;
  setAdvertisementVisibility: (s: boolean) => void;
  isAddBotLoading: boolean;
  setAddBotLoading: (s: boolean) => void;
  handleFetchNewBot: (s: 'decline' | 'accept', data: SearchDataType) => void;
  addBotData: GetBotToAddResponse | null;
  fetchUserData: () => void;
  handleUpdateSettings: (search_gender: string, search_age_from: number, search_age_to: number) => void;
  chatPhoto: string | null;
  handleAddFile: (s: string) => void;
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
export type SearchDataType = {
  gender: string;
  nation: string;
  figure: string;
  age_from: number;
  age_to: number;
};
