import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Dialog, Drawer, LinearProgress, Typography } from '@mui/material';
import ArrowBack from '../../../../assets/svg/arrow_back.svg';
import tg_premium from '../../../../assets/images/tg_premium.webp';

import { useAppState } from '../../../../providers/AppProvider.hooks';
import { APP_COLORS, APP_VIEW } from '../../../../utils/constants';
import background from '../../../../assets/images/chat_bg.webp';
import ReadSvg from '../../../../assets/svg/readed_gray.svg';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachIcon from '../../../../assets/svg/attack_icon.svg';
import { linearProgressClasses } from '@mui/material/LinearProgress';

export const MessagesProgress = ({ progress }: { progress: number | undefined }) => {
  return (
    <Box
      sx={{
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LinearProgress
        sx={{
          width: '100%',
          height: 10,
          minHeight: '30px',
          borderRadius: 5,
          [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: '#1C1C1D',
          },
          [`& .${linearProgressClasses.bar}`]: {
            background: 'linear-gradient(180deg, #6558FD 0%, #7951CE 100%)',
            borderRadius: 10,
          },
        }}
        variant="determinate"
        value={Number(progress) * 10}
      />
      <Typography
        sx={{
          fontFamily: 'sfpro400',
          color: APP_COLORS.textMain,
          fontSize: '12px',
          position: 'absolute',
        }}
      >
        Messages limit {progress}/10
      </Typography>
    </Box>
  );
};

function Chat() {
  const [message, setMessage] = useState('');
  const {
    handleSendMessage,
    setSelectedAppView,
    setSelectedConversationId,
    selectedConversationId,
    conversations,
    setSelectedBotId,
    chatPhoto,
    handleAddFile,
    messagesLimit,
    setMessagesLimit,
  } = useAppState();
  const [isLimitOpen, setLimitOpen] = useState(false);

  const handleSendMessageClick = useCallback(() => {
    if (message !== '') {
      if (messagesLimit >= 10) {
        setLimitOpen(true);
      } else {
        setMessagesLimit(messagesLimit + 1);
        handleSendMessage(message);
        setMessage('');
      }
    }
  }, [messagesLimit, message]);

  const handleClickBack = () => {
    setSelectedConversationId(null);
    setSelectedAppView(APP_VIEW.MAIN);
  };

  const selectedConversation = useMemo(
    () => conversations.find((chat) => chat.id === selectedConversationId),
    [selectedConversationId, conversations]
  );

  useEffect(() => {
    var container = document.getElementById('messages_container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [selectedConversation?.messages]);

  const handleBotClick = (botId: string | undefined) => {
    setSelectedBotId(botId ?? null);
  };

  const handleFileAdd = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleAddFile(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <>
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
            justifyContent: 'flex-end',
            background: `url(${background})`,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              width: '100%',
            }}
          >
            <Box
              sx={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                top: 0,
                width: '100%',
                maxWidth: '430px',
                backgroundColor: APP_COLORS.black,
                height: '64px',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <Box
                onClick={handleClickBack}
                sx={{
                  display: 'flex',
                  gap: '8px',
                  marginLeft: '20px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src={ArrowBack} alt="back"></img>
                <Typography
                  sx={{
                    fontFamily: 'sfpro400',
                    color: APP_COLORS.textMain,
                    fontSize: '17px',
                  }}
                >
                  Chats
                </Typography>
              </Box>
              <Box
                onClick={() => handleBotClick(selectedConversation?.bot?.id)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'sfpro400',
                    color: APP_COLORS.textMain,
                    fontSize: '17px',
                  }}
                >
                  {selectedConversation?.bot.username}, {selectedConversation?.bot.settings.age}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'sfpro400',
                    color: APP_COLORS.textSecondary,
                    fontSize: '13px',
                    marginTop: '-5px',
                    lineHeight: '18px',
                  }}
                >
                  last seen just now
                </Typography>
              </Box>
              <Box
                onClick={() => handleBotClick(selectedConversation?.bot?.id)}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '10px',
                  marginRight: '20px',
                  width: '64px',
                }}
              >
                <Box
                  sx={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'lightgrey',
                    backgroundImage: `url(${selectedConversation?.bot.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                ></Box>
              </Box>
            </Box>
            <MessagesProgress progress={messagesLimit} />
          </Box>
          <Box
            id="messages_container"
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              paddingBottom: '10px',
              paddingTop: '10px',
              overflow: 'auto',
            }}
          >
            {selectedConversation?.messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  background: message.fromYou
                    ? 'linear-gradient(180deg, #6558FD 0%, #7951CE 100%)'
                    : APP_COLORS.botMessage,
                  padding: '10px 15px 5px',
                  borderRadius: '16px',
                  maxWidth: '70%',
                  marginLeft: message.fromYou ? 'auto' : '10px',
                  marginRight: message.fromYou ? '10px' : 'auto',
                }}
              >
                {message.text === 'user_image_message_key' || message.text === 'bot_image_message_key' ? (
                  <Box
                    sx={{
                      maxWidth: '100%',
                      marginTop: '5px',
                      '& img': {
                        maxWidth: '100%',
                        borderRadius: '5px',
                      },
                    }}
                  >
                    <img
                      src={
                        message.text === 'bot_image_message_key'
                          ? // TODO TO DO CHANGE FILE FORMAT
                            `data:image/jpeg;base64, ${message.image}`
                          : // message.image
                            chatPhoto || ''
                      }
                      alt="Solo soul"
                    ></img>
                  </Box>
                ) : (
                  <Typography
                    sx={{
                      fontFamily: 'sfpro400',
                      color: APP_COLORS.textMain,
                      fontSize: '17px',
                      textAlign: message.fromYou ? 'right' : 'left',
                    }}
                  >
                    {message.text}
                  </Typography>
                )}
                <Box
                  sx={{
                    // border: '1px solid red',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '4px',
                  }}
                >
                  <Typography
                    sx={{
                      // border: '1px solid red',
                      textAlign: 'right',
                      fontFamily: 'sfpro400',
                      color: APP_COLORS.textSecondary,
                      fontSize: '11px',
                    }}
                  >
                    {message.timestamp}
                  </Typography>
                  <img src={ReadSvg} alt="read"></img>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              borderTop: `0.5px solid ${APP_COLORS.border}`,
              minHeight: '84px',
              background: APP_COLORS.black,
              width: '100%',
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                paddingTop: '6px',

                '& input': {
                  width: '100%',
                  textIndent: '10px',
                  height: '33px',
                  background: APP_COLORS.darkBlack,
                  border: `1px solid ${APP_COLORS.border}`,
                  borderRadius: '20px',
                  color: APP_COLORS.textMain,
                  fontFamily: 'sfpro500',
                  fontSize: '17px',
                  '&:focus-visible': {
                    outline: 'none',
                  },
                },
                '& input::placeholder': {
                  fontFamily: 'sfpro400',
                  color: '#636366',
                  fontSize: '17px',
                },
              }}
            >
              <Box
                sx={{
                  '& input': {
                    display: 'none',
                  },
                  '& label': {
                    cursor: 'pointer',
                    margin: '10px',
                  },
                }}
              >
                <label>
                  <img src={AttachIcon} alt="attach"></img>
                  <input onChange={handleFileAdd} type={'file'} accept="image/png, image/jpeg"></input>
                </label>
              </Box>
              <input
                placeholder="Message"
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessageClick();
                  }
                }}
              ></input>
              <Box
                sx={{
                  '& svg': {
                    fill: message.length > 0 ? APP_COLORS.blue : APP_COLORS.textSecondary,
                    margin: '0 10px',
                    cursor: 'pointer',
                    width: '30px',
                    height: '30px',
                  },
                  '& :hover': {
                    '& path': {
                      fill: APP_COLORS.blue,
                    },
                  },
                }}
              >
                <SendRoundedIcon onClick={handleSendMessageClick} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Drawer
        open={isLimitOpen}
        PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <Box
          sx={{
            padding: '20px',
            background: APP_COLORS.black,
            maxWidth: '70%',
            borderRadius: '20px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'sfpro400',
              color: APP_COLORS.textMain,
              fontSize: '18px',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            Oops! Looks like you've reached your message limit
          </Typography>
          <Button
            onClick={() => {
              setSelectedAppView(APP_VIEW.SETTINGS);
            }}
            variant="contained"
            sx={{
              color: 'white',
              borderRadius: '10px',
              width: '100%',
              background: 'linear-gradient(180deg, #6558FD 0%, #7951CE 100%)',
            }}
          >
            <img style={{ marginRight: '5px' }} width={20} height={20} src={tg_premium} alt="tg_premium"></img>
            Increase my limits
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

export default Chat;
