import React from 'react';
import { Box, Typography } from '@mui/material';

import { useAppState } from '../../../../providers/AppProvider.hooks';
import Footer from '../../../common/Footer/Footer';
import { APP_VIEW } from '../../../../providers/AppProvider.types';
import { Conversation } from '../../../../services/requests';

function Chats() {
  const { setSelectedConversation, setSelectedAppView, userConversations } = useAppState();

  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setSelectedAppView(APP_VIEW.CHAT);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        top: 0,
        bottom: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          maxWidth: '430px',
          margin: 'auto',
          flexDirection: 'column',
          alignItems: 'center',
          // justifyContent: 'flex-end',
          backgroundColor: '#EEE',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            marginBottom: '10px',
          }}
        >
          {userConversations?.map((conversation, index) => (
            <Box
              key={index}
              sx={{
                padding: '10px',
                borderBottom: '1px solid lightgray',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                cursor: 'pointer',
              }}
              onClick={() => {
                handleConversationClick(conversation);
              }}
            >
              <Box
                sx={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'lightgray',
                  backgroundImage: `url(${conversation.bot.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              ></Box>
              <Box>
                <Typography variant="h5">{conversation.bot.username}</Typography>
                <Typography
                  sx={{
                    opacity: 0.5,
                  }}
                >
                  {conversation.bot.gender}, {conversation.bot.age}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default Chats;
