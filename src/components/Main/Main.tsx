import React, { useMemo } from 'react';

import { useAppState } from '../../providers/AppProvider.hooks';
import Chat from './components/Chat/Chat';
import Chats from './components/Chats/Chats';
import Settings from './components/Settings/Settings';
import { APP_VIEW } from '../../utils/constants';
import BotPage from './components/BotPage/BotPage';

function Main() {
  const { selectedAppView } = useAppState();

  const getAppView = useMemo(() => {
    switch (selectedAppView) {
      case APP_VIEW.CHAT: {
        return <Chat />;
      }
      case APP_VIEW.SETTINGS: {
        return <Settings />;
      }
      default: {
        return <Chats />;
      }
    }
  }, [selectedAppView]);

  return (
    <>
      {getAppView}
      <BotPage />
    </>
  );
}

export default Main;
