import React from 'react';
import { Box, Typography } from '@mui/material';

import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ChatIcon from '@mui/icons-material/Chat';
import { useAppState } from '../../../providers/AppProvider.hooks';
import { APP_VIEW } from '../../../providers/AppProvider.types';

function Footer() {
  const { selectedAppView, setSelectedAppView } = useAppState();

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-evenly',
        background: 'lightgrey',
        padding: '15px 0',
        '& div': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
        },
      }}
    >
      <Box
        onClick={() => {
          setSelectedAppView(APP_VIEW.MAIN);
        }}
        sx={{
          opacity: selectedAppView === APP_VIEW.MAIN ? 1 : 0.5,
        }}
      >
        <ChatIcon sx={{ width: '50px', height: '50px' }} />
        <Typography>Chats</Typography>
      </Box>
      <Box
        onClick={() => {
          setSelectedAppView(APP_VIEW.SETTINGS);
        }}
        sx={{
          opacity: selectedAppView === APP_VIEW.SETTINGS ? 1 : 0.5,
        }}
      >
        <SettingsApplicationsIcon sx={{ width: '50px', height: '50px' }} />
        <Typography>Settings</Typography>
      </Box>
    </Box>
  );
}

export default Footer;
