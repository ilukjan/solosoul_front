import { ReactNode, createContext, FC, useState, useEffect } from 'react';
import { APP_VIEW, AppProviderContextType, Message } from './AppProvider.types';
import { Conversation, GetAllConversationsResponse, getAllConversations, sendMessage, signIn } from '../services/requests';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { APP_STORAGE_KEYS } from '../services/constants';

export const AppContext = createContext<AppProviderContextType | null>(null);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userAccessToken, setUserAccessToken] = useState<string | null>(null);
  const [isSignInLoading, setSignInLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userConversations, setUserConversations] = useState<GetAllConversationsResponse | null>(null);
  const [signInError, setSignInError] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [selectedAppView, setSelectedAppView] = useState(APP_VIEW.MAIN)

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


  // GET CHATS
  useEffect(() => {
    if(userId && userAccessToken){
      getAllConversations(userId, userAccessToken).then(response=>{
        setUserConversations(response);
      })
    }
  }, [userId, userAccessToken]);

  const handleSignIn = (username: string, password: string) => {
    setSignInLoading(true);
    signIn({ username, password })
      .then((response) => {
        console.log('signIn response', response);
        setUserAccessToken(response.access_token);
        setUserId(response.user_id)
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
            console.log(1, 'ReceiveMessageResponse', typeof ReceiveMessageResponse, JSON.parse(ReceiveMessageResponse));
            const answerMessage = JSON.parse(ReceiveMessageResponse).message;
            setChatMessages((prev) => [
              ...prev,
              {
                fromYou: false,
                text: answerMessage,
              },
            ]);
          });
        } catch (error) {
          console.log('Connection failed: ' + error);
        }
      }
    })();
  }, [connection]);

  const handleSendMessage = (message: string) => {
    setChatMessages((prev) => [
      ...prev,
      {
        fromYou: true,
        text: message,
      },
    ]);

    if (userAccessToken && selectedConversation) {
      sendMessage(selectedConversation.id, message, userAccessToken);
    }
  };

  const value: AppProviderContextType = {
    isUserAuthorized: userAccessToken !== null,
    handleSignIn,
    isSignInLoading,
    signInError,
    setSignInError,
    handleSendMessage,
    chatMessages,
    userConversations,
    selectedAppView,
    setSelectedAppView,
    setSelectedConversation,
    setChatMessages,
    selectedConversation
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
