import { ReactNode, createContext, FC, useState, useEffect } from 'react';
import {
  AppProviderContextType,
  ConversationsState,
  Message,
  SocketReceiveMessageType,
  SocketSystemMessageType,
} from './AppProvider.types';
import { UserProfileResponse, getAllConversations, getUserProfile, sendMessage, signIn } from '../services/requests';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { APP_STORAGE_KEYS } from '../services/constants';
import { APP_VIEW } from '../utils/constants';
import { getMessagesFromLocalStorage, saveMessageToLocalStorage } from '../utils/localStorage';

export const AppContext = createContext<AppProviderContextType | null>(null);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userAccessToken, setUserAccessToken] = useState<string | null>(null);
  const [isSignInLoading, setSignInLoading] = useState(false);
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
    console.log('access_token', access_token);
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

  // GET DATA
  useEffect(() => {
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

      getUserProfile(userId, userAccessToken).then((response) => {
        console.log('getUserProfile', response);
        setUserProfile(response);
      });
    }
  }, [userId, userAccessToken]);
  console.log('add', advertisementVisibility);
  const handleSignIn = (username: string, password: string) => {
    setSignInLoading(true);
    signIn({ username, password })
      .then((response) => {
        console.log('signIn response', response);
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
          console.log('Connected');

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
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
