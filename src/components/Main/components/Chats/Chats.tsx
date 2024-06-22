import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

import { useAppState } from '../../../../providers/AppProvider.hooks';
import Footer from '../../../common/Footer/Footer';
import { Conversation } from '../../../../services/requests';
import { APP_COLORS, APP_VIEW } from '../../../../utils/constants';
import ReadSvg from '../../../../assets/svg/readed.svg';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Advertisement from './Advertisement';
import StoriesWrapper from './Stories';
import AddBotPage from '../BotPage/AddBotPage';

function Chats() {
  const { setSelectedConversationId, setSelectedAppView, conversations, setAddBotOpen } = useAppState();
  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversationId(conversation.id);
    setSelectedAppView(APP_VIEW.CHAT);
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          color: 'gray',
          zIndex: 9999,
          fontSize: '8px',
        }}
      >
        0.1
      </Box>
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
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                top: 0,
                width: '100%',
                maxWidth: '430px',
                background: APP_COLORS.black,
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'sfpro600',
                  color: '#fff',
                  padding: '20px 0',
                }}
              >
                Chats
              </Typography>
              <StoriesWrapper></StoriesWrapper>
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
            }}
          >
            <Advertisement />
            <Box height={'10px'}></Box>
            {conversations?.map((conversation, index) => (
              <Box
                key={index}
                sx={{
                  padding: '7px 0 0px 10px',
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
                    maxWidth: '60px',
                    minHeight: '60px',
                    maxHeight: '60px',
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
                    paddingBottom: '20px',
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: 'sfpro500',
                        color: APP_COLORS.textMain,
                        letterSpacing: '0.5px',
                        fontSize: '16px',
                      }}
                    >
                      {conversation.bot.username}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'sfpro400',
                        color: APP_COLORS.textSecondary,
                        fontSize: '15px',
                      }}
                    >
                      {conversation.bot.settings.gender}, {conversation.bot.settings.age}
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
                        10:{conversation.bot.settings.age + 14}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              width: '50px',
              height: '50px',
              position: 'absolute',
              bottom: '110px',
              right: '25px',
              borderRadius: '50%',
              background: 'linear-gradient(180deg, #6558FD 0%, #7951CE 100%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              '& svg': {
                fill: APP_COLORS.textMain,
                width: '40px',
                height: '40px',
              },
            }}
            onClick={() => {
              setAddBotOpen(true);
            }}
          >
            <AddRoundedIcon />
          </Box>
          <Footer />
        </Box>
      </Box>

      <AddBotPage />
    </>
  );
}

export default Chats;
