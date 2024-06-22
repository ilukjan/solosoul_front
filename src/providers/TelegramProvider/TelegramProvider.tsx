import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export interface ITelegramContext {
  webApp?: WebApp;
  user?: WebAppUser;
  telegramUserId?: number;
}

export const TelegramContext = createContext<ITelegramContext>({});

export const TelegramProvider = ({ children }: { children: React.ReactNode }) => {
  const [webApp, setWebApp] = useState<WebApp | null>(null);

  useEffect(() => {
    const app = window.Telegram?.WebApp;
    if (app) {
      app.ready();
      setWebApp(app);
      app.setHeaderColor('#0E111B');
      app.setBackgroundColor('#0E111B');
    }
  }, []);

  // EXPAND APP FOR TELEGRAM
  useEffect(() => {
    webApp?.expand();
  }, [webApp]);

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
          telegramUserId:
            process.env.NODE_ENV === 'development'
              ? (process.env.REACT_APP_FALLBACK_TELEGRAM_USER_ID as number | undefined)
              : webApp.initDataUnsafe.user?.id,
        }
      : {};
  }, [webApp]);

  console.log('webApp', webApp);

  return (
    <TelegramContext.Provider value={value}>
      {/* Make sure to include script tag with "beforeInteractive" strategy to pre-load web-app script */}
      {/* <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />      */}
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
