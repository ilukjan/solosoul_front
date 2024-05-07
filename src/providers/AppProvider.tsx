import { ReactNode, createContext, FC, useState, useEffect } from 'react';
import { AppProviderContextType, Message } from './AppProvider.types';
import { sendMessage, signIn } from '../services/requests';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { APP_STORAGE_KEYS } from '../services/constants';

export const AppContext = createContext<AppProviderContextType | null>(null);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userAccessToken, setUserAccessToken] = useState<string | null>(null);
  const [isSignInLoading, setSignInLoading] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const DIALOG_ID = '22dcaef0-01b9-47a9-8af1-8eafec0e0264';

  useEffect(() => {
    const token_expired_date = window.localStorage.getItem(APP_STORAGE_KEYS.ACCESS_TOKEN_VALID_TILL);
    const access_token = window.localStorage.getItem(APP_STORAGE_KEYS.ACCESS_TOKEN);
    console.log('access_token', access_token);
    if (token_expired_date) {
      if (new Date(token_expired_date) > new Date()) {
        setUserAccessToken(access_token);
      } else {
        window.localStorage.removeItem(APP_STORAGE_KEYS.ACCESS_TOKEN);
        window.localStorage.removeItem(APP_STORAGE_KEYS.ACCESS_TOKEN_VALID_TILL);
      }
    }
  }, []);

  const handleSignIn = (username: string, password: string) => {
    setSignInLoading(true);
    signIn({ username, password })
      .then((response) => {
        console.log('resp', response);
        setUserAccessToken(response.access_token);
        window.localStorage.setItem(APP_STORAGE_KEYS.ACCESS_TOKEN, response.access_token);
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
            setMessages((prev) => [
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
    setMessages((prev) => [
      ...prev,
      {
        fromYou: true,
        text: message,
      },
    ]);

    if (userAccessToken) {
      sendMessage(DIALOG_ID, message, userAccessToken);
    }
  };

  const value: AppProviderContextType = {
    isUserAuthorized: userAccessToken !== null,
    handleSignIn,
    isSignInLoading,
    signInError,
    setSignInError,
    handleSendMessage,
    messages,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
