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
  sendMessage,
  signIn,
  updateSettings,
} from '../services/requests';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { APP_STORAGE_KEYS } from '../services/constants';
import { APP_VIEW } from '../utils/constants';
import { getMessagesFromLocalStorage, saveMessageToLocalStorage } from '../utils/localStorage';

export const AppContext = createContext<AppProviderContextType | null>(null);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userAccessToken, setUserAccessToken] = useState<string | null>(null);
  const [isSignInLoading, setSignInLoading] = useState(false);
  const [isAddBotLoading, setAddBotLoading] = useState(false);
  const [isAddBotOpen, setAddBotOpen] = useState(false);
  const [addBotData, setAddBotData] = useState<GetBotToAddResponse | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);
  const [signInError, setSignInError] = useState(false);
  const [conversations, setConversations] = useState<ConversationsState>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [selectedAppView, setSelectedAppView] = useState(APP_VIEW.MAIN);
  const [selectedBotId, setSelectedBotId] = useState<string | null>(null);
  const [advertisement, setAdvertisement] = useState<string | null>(null);
  const [advertisementVisibility, setAdvertisementVisibility] = useState(false);
  const [tips, setTips] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setTips((prev) => [...prev, 'Welcome to Solo Soul!', 'Here you will receive tips and hints. Do not miss!']);
    }, 5000);
  }, []);

  useEffect(() => {
    const token_expired_date = window.localStorage.getItem(APP_STORAGE_KEYS.ACCESS_TOKEN_VALID_TILL);
    const access_token = window.localStorage.getItem(APP_STORAGE_KEYS.ACCESS_TOKEN);
    const user_id = window.localStorage.getItem(APP_STORAGE_KEYS.USER_ID);

    if (token_expired_date) {
      if (new Date(token_expired_date) > new Date()) {
        setUserAccessToken(access_token);
        setUserId(user_id);
      } else {
        window.localStorage.removeItem(APP_STORAGE_KEYS.ACCESS_TOKEN);
        window.localStorage.removeItem(APP_STORAGE_KEYS.ACCESS_TOKEN_VALID_TILL);
      }
    }
  }, []);

  const fetchUserConversations = () => {
    if (userId && userAccessToken) {
      getAllConversations(userId, userAccessToken).then((response) => {
        console.log('getAllConversations', response);

        const conversationsWithMessages = response.map((conv) => {
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
      fetchUserConversations();

      fetchUserData();

      fetchBotToAdd();
    }
  }, [userId, userAccessToken]);

  const handleSignIn = (username: string, password: string) => {
    setSignInLoading(true);
    signIn({ username, password })
      .then((response) => {
        setUserAccessToken(response.access_token);
        setUserId(response.user_id);
        window.localStorage.setItem(APP_STORAGE_KEYS.ACCESS_TOKEN, response.access_token);
        window.localStorage.setItem(APP_STORAGE_KEYS.USER_ID, response.user_id);
        window.localStorage.setItem(APP_STORAGE_KEYS.ACCESS_TOKEN_VALID_TILL, response.token_valid_till);
      })
      .catch((err) => {
        console.error('sign in error: ', err);
        setSignInError(true);
      })
      .finally(() => {
        setSignInLoading(false);
      });
  };
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    if (userAccessToken) {
      const newConnection = new HubConnectionBuilder()
        .withUrl('https://solosoul.azurewebsites.net/botChatHub', {
          // skipNegotiation: true,
          // transport: HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);
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
              const updatedConversations = prev.map((conv) => {
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

  const value: AppProviderContextType = {
    isUserAuthorized: userAccessToken !== null,
    handleSignIn,
    isSignInLoading,
    signInError,
    setSignInError,
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
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
