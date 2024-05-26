import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ArrowBack from '../../../../assets/svg/arrow_back.svg';

import { useAppState } from '../../../../providers/AppProvider.hooks';
import { APP_COLORS, APP_VIEW } from '../../../../utils/constants';
import background from '../../../../assets/images/chat_bg.webp';
import ReadSvg from '../../../../assets/svg/readed_gray.svg';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachIcon from '../../../../assets/svg/attack_icon.svg';

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
  } = useAppState();
  const [isWebcamAllowed, setWebcamAllowed] = useState(false);
  const cameraRef = useRef(null);
  const camera = useRef(null);

  const handleSendMessageClick = () => {
    if (message !== '') {
      handleSendMessage(message);
      setMessage('');
    }
  };

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
              position: 'fixed',
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
        </Box>
        <Box
          id="messages_container"
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            paddingBottom: '10px',
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
              {message.text === 'user_image_message_key' ? (
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
                  <img src={chatPhoto || ''} alt="user photo"></img>
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
  );
}

export default Chat;
