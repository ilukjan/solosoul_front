import React from 'react';
import { Box, Typography } from '@mui/material';

import ChatIcon from '../../../assets/svg/chats_icon.svg';
import { useAppState } from '../../../providers/AppProvider.hooks';
import { APP_COLORS, APP_VIEW } from '../../../utils/constants';

function Footer() {
  const { selectedAppView, setSelectedAppView, userProfile } = useAppState();

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-evenly',
        background: APP_COLORS.black,
        padding: '15px 0 24px',
        '& div': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          '& p': {
            fontFamily: 'sfpro500',
            fontSize: '10px',
            color: '#fff',
            marginTop: '4px',
          },
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
        <img src={ChatIcon} alt="chats"></img>
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
        <Box
          sx={{
            width: '25px',
            height: '25px',
            background: 'lightgrey',
            borderRadius: '50%',
            backgroundImage: `url(${userProfile?.img})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        ></Box>
        <Typography>Settings</Typography>
      </Box>
    </Box>
  );
}

export default Footer;
