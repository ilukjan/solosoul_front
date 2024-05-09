import React from 'react';
import { Box, Typography } from '@mui/material';

import { useAppState } from '../../../../providers/AppProvider.hooks';
import Footer from '../../../common/Footer/Footer';
import { Conversation } from '../../../../services/requests';
import { APP_COLORS, APP_VIEW } from '../../../../utils/constants';
import ReadSvg from '../../../../assets/svg/readed.svg';

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
        }}
      >
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              position: 'fixed',
              justifyContent: 'center',
              top: 0,
              width: '100%',
              maxWidth: '430px',
              background: APP_COLORS.black,
              padding: '20px 0',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'sfpro600',
                color: '#fff',
              }}
            >
              Chats
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: APP_COLORS.darkBlack,
            overflow: 'auto',
            marginTop: '64px',
            paddingTop: '10px',
          }}
        >
          {userConversations?.map((conversation, index) => (
            <Box
              key={index}
              sx={{
                padding: '7px 0 7px 10px',
                display: 'flex',
                gap: '20px',
                cursor: 'pointer',
              }}
              onClick={() => {
                handleConversationClick(conversation);
              }}
            >
              <Box
                sx={{
                  minWidth: '60px',
                  minHeight: '60px',
                  borderRadius: '50%',
                  background: 'lightgray',
                  backgroundImage: `url(${conversation.bot.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              ></Box>
              <Box
                sx={{
                  borderBottom: `0.5px solid ${APP_COLORS.border}`,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontFamily: 'sfpro500',
                      color: APP_COLORS.textMain,
                      letterSpacing: '0.5px',
                    }}
                  >
                    {conversation.bot.username}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'sfpro400',
                      color: APP_COLORS.textSecondary,
                    }}
                  >
                    {conversation.bot.gender}, {conversation.bot.age}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    marginRight: '10px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '4px',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img src={ReadSvg} alt="read"></img>
                    <Typography
                      sx={{
                        fontFamily: 'sfpro400',
                        color: APP_COLORS.textSecondary,
                      }}
                    >
                      10:{conversation.bot.age + 14}
                    </Typography>
                  </Box>
                </Box>
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
