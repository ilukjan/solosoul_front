import { ReactNode, createContext, FC, useState, useEffect } from 'react';
import {
  AppProviderContextType,
  ConversationsState,
  Message,
  SocketReceiveMessageType,
  SocketSystemMessageType,
} from './AppProvider.types';
import {
  GetBotToAddResponse,
  UserProfileResponse,
  addConversation,
  getAllConversations,
  getBotToAdd,
  getUserProfile,
  sendMediaMessage,
  sendMessage,
  updateSettings,
} from '../../services/requests';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { APP_VIEW } from '../../utils/constants';
import { getMessagesFromLocalStorage, saveMessageToLocalStorage } from '../../utils/localStorage';
import { useSignIn } from '../SignInProvider/SignInProvider.hooks';

export const AppContext = createContext<AppProviderContextType | null>(null);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { userAccessToken, userId } = useSignIn();
  const [isAddBotLoading, setAddBotLoading] = useState(false);
  const [isAddBotOpen, setAddBotOpen] = useState(false);
  const [addBotData, setAddBotData] = useState<GetBotToAddResponse | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);
  const [conversations, setConversations] = useState<ConversationsState>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [selectedAppView, setSelectedAppView] = useState(APP_VIEW.MAIN);
  const [selectedBotId, setSelectedBotId] = useState<string | null>(null);
  const [advertisement, setAdvertisement] = useState<string | null>(null);
  const [advertisementVisibility, setAdvertisementVisibility] = useState(false);
  const [tips, setTips] = useState<string[]>([]);
  const [chatPhoto, setChatPhoto] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setTips((prev) => [
        ...prev,
        'Hi! This is your virtual partner trainer! Start chat with him/her and good luck 😉',
        'Don’t be afraid, just write something like “hi there” and enjoy communication ☺️ 🫡',
      ]);
    }, 100);
  }, []);

  const fetchUserConversations = () => {
    if (userId && userAccessToken) {
      getAllConversations(userId, userAccessToken).then((response) => {
        console.log('getAllConversations', response);

        const conversationsWithMessages: ConversationsState = response.map((conv) => {
          const saved_messages = getMessagesFromLocalStorage(conv.id);
          return {
            ...conv,
            messages: saved_messages,
          };
        });
        setConversations(conversationsWithMessages);
      });
    }
  };

  const fetchUserData = () => {
    if (userId && userAccessToken) {

      getUserProfile(userId, userAccessToken).then((response) => {
        console.log('getUserProfile', response);
        setUserProfile(response);
      });
    }
  };

  const fetchBotToAdd = () => {
    if (userId && userAccessToken) {
      setAddBotLoading(true);

      getBotToAdd(userId || '', userAccessToken || '').then((response) => {
        console.log('getBotToAdd', response);
        setAddBotData(response);
        setAddBotLoading(false);
      });
    }
  };

  // GET DATA
  useEffect(() => {
    if (userId && userAccessToken) {
      // fetchUserConversations();

      fetchUserData();

      // fetchBotToAdd();
    }
  }, [userId, userAccessToken]);

  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    if (userAccessToken) {
      // const newConnection = new HubConnectionBuilder()
      //   .withUrl('https://solosoul.azurewebsites.net/botChatHub', {
      //     // skipNegotiation: true,
      //     // transport: HttpTransportType.WebSockets,
      //   })
      //   .withAutomaticReconnect()
      //   .build();

      // setConnection(newConnection);
    }
  }, [userAccessToken]);

  useEffect(() => {
    (async () => {
      if (connection) {
        try {
          await connection.start();

          connection.on('ReceiveMessage', (ReceiveMessageResponse) => {
            console.log('ReceiveMessageResponse', typeof ReceiveMessageResponse, JSON.parse(ReceiveMessageResponse));

            const answerMessage: SocketReceiveMessageType = JSON.parse(ReceiveMessageResponse);

            setConversations((prev) => {
              const updatedConversations: ConversationsState = prev.map((conv) => {
                if (conv.id === answerMessage.ConversationId) {
                  const newMessage: Message = {
                    fromYou: false,
                    text: answerMessage.Message,
                    timestamp: `${new Date(answerMessage.Timestamp).getHours()}:${new Date(
                      answerMessage.Timestamp
                    ).getMinutes()}`,
                  };

                  saveMessageToLocalStorage(newMessage, answerMessage.ConversationId);

                  return {
                    ...conv,
                    messages: [...conv.messages, newMessage],
                  };
                } else {
                  return conv;
                }
              });
              return updatedConversations;
            });
          });

          connection.on('SystemMessage', (ReceiveMessageResponse) => {
            console.log('SystemMessage', JSON.parse(ReceiveMessageResponse));

            const answerMessage: SocketSystemMessageType = JSON.parse(ReceiveMessageResponse);
            if (answerMessage.UserId) {
              setTips((prev) => [...prev, answerMessage.Message]);
            } else {
              setAdvertisement(answerMessage.Message);
              setAdvertisementVisibility(true);
            }
          });
        } catch (error) {
          console.log('Receive Connection failed: ' + error);
        }
      }
    })();
  }, [connection]);

  const handleFetchNewBot = (type: 'decline' | 'accept') => {
    switch (type) {
      case 'accept': {
        addConversation(userId || '', userAccessToken || '', addBotData?.id || '').then((response) => {
          setAddBotOpen(false);
          fetchUserConversations();
        });
        break;
      }
      case 'decline': {
        fetchBotToAdd();
        break;
      }
    }
  };

  const handleSendMessage = (message: string) => {
    if (userAccessToken && selectedConversationId) {
      sendMessage(selectedConversationId, message, userAccessToken);
      setConversations((prev) => {
        const updatedConversations = prev.map((conv) => {
          if (conv.id === selectedConversationId) {
            const newMessage = {
              fromYou: true,
              text: message,
              timestamp: `${new Date().getHours()}:${new Date().getMinutes()}`,
            };

            saveMessageToLocalStorage(newMessage, selectedConversationId);

            return {
              ...conv,
              messages: [...conv.messages, newMessage],
            };
          } else {
            return conv;
          }
        });

        return updatedConversations;
      });
    }
  };

  const handleUpdateSettings = (search_gender: string, search_age_from: number, search_age_to: number) => {
    if (userAccessToken && userId) {
      updateSettings(userId, userAccessToken, search_gender, search_age_from, search_age_to).then((response) => {
        fetchBotToAdd();
      });
    }
  };

  const handleAddFile = (path: string) => {
    setChatPhoto(path);
    sendMediaMessage(selectedConversationId || '', userAccessToken || '');
    setConversations((prev) => {
      const updatedConversations = prev.map((conv) => {
        if (conv.id === selectedConversationId) {
          const newMessage = {
            fromYou: true,
            text: 'user_image_message_key',
            timestamp: `${new Date().getHours()}:${new Date().getMinutes()}`,
          };

          return {
            ...conv,
            messages: [...conv.messages, newMessage],
          };
        } else {
          return conv;
        }
      });

      return updatedConversations;
    });
  };

  const value: AppProviderContextType = {
    handleSendMessage,
    selectedAppView,
    setSelectedAppView,
    setSelectedConversationId,
    selectedConversationId,
    userProfile,
    conversations,
    selectedBotId,
    setSelectedBotId,
    advertisement,
    setAdvertisement,
    tips,
    advertisementVisibility,
    setAdvertisementVisibility,
    isAddBotOpen,
    setAddBotOpen,
    isAddBotLoading,
    setAddBotLoading,
    handleFetchNewBot,
    addBotData,
    fetchUserData,
    handleUpdateSettings,
    chatPhoto,
    handleAddFile,
    setUserProfile
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
