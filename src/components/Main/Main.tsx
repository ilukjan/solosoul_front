import React, { useMemo } from 'react';

import { useAppState } from '../../providers/AppProvider/AppProvider.hooks';
import Chat from './components/Chat/Chat';
import Chats from './components/Chats/Chats';
import Settings from './components/Settings/Settings';
import { APP_VIEW } from '../../utils/constants';
import BotPage from './components/BotPage/BotPage';
import { Box, CircularProgress } from '@mui/material';
import { useSignIn } from '../../providers/SignInProvider/SignInProvider.hooks';
import Onboarding from './components/Onboarding/Onboarding';

function Main() {
  const { selectedAppView, userProfile } = useAppState();
  const { isSignInLoading } = useSignIn();

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

  if (isSignInLoading)
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={80}></CircularProgress>
      </Box>
    );

    if(userProfile?.account === null){
      return <Onboarding></Onboarding>
    }

  return (
    <>
      {getAppView}
      <BotPage />
    </>
  );
}

export default Main;
