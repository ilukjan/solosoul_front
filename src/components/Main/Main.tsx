import React, { useMemo } from 'react';

import { useAppState } from '../../providers/AppProvider.hooks';
import { APP_VIEW } from '../../providers/AppProvider.types';
import Chat from './components/Chat/Chat';
import Chats from './components/Chats/Chats';
import Settings from './components/Settings/Settings';

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

  return <>{getAppView}</>;
}

export default Main;
