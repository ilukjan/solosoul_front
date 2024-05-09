import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import { useAppState } from '../../../../providers/AppProvider.hooks';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { APP_VIEW } from '../../../../utils/constants';

function Chat() {
  const [message, setMessage] = useState('');
  const {
    handleSendMessage,
    chatMessages,
    setChatMessages,
    setSelectedAppView,
    setSelectedConversation,
    selectedConversation,
  } = useAppState();
  const handleSendMessageClick = () => {
    handleSendMessage(message);
    setMessage('');
  };

  const handleClickBack = () => {
    setSelectedConversation(null);
    setSelectedAppView(APP_VIEW.MAIN);
    setChatMessages([]);
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
          backgroundColor: '#EEE',
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
              top: 0,
              width: '100%',
              maxWidth: '430px',
              background: '#fff',
            }}
            onClick={handleClickBack}
          >
            <Box
              sx={{
                display: 'flex',
                padding: '20px',
              }}
            >
              <ArrowBackIosIcon />
              <Typography>Back</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '10px',
                marginRight: '20px',
              }}
            >
              <Typography>
                {selectedConversation?.bot.username},{selectedConversation?.bot.age}
              </Typography>
              <Box
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'lightgrey',
                  backgroundImage: `url(${selectedConversation?.bot.img})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'top',
                  backgroundRepeat: 'no-repeat',
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            marginBottom: '10px',
            overflow: 'auto',
          }}
        >
          {chatMessages.map((message, index) => (
            <Box
              key={index}
              sx={{
                background: message.fromYou ? 'lightblue' : 'lightgray',
                padding: '10px',
                borderRadius: '8px',
                maxWidth: '50%',
                marginLeft: message.fromYou ? 'auto' : '10px',
                marginRight: message.fromYou ? '10px' : 'auto',
              }}
            >
              <Typography
                sx={{
                  textAlign: message.fromYou ? 'right' : 'left',
                }}
              >
                {message.text}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            width: '100%',
            position: 'relative',
            display: 'flex',
            '& input': {
              width: '100%',
              textIndent: '20px',
              height: '52px',
              background: 'rgb(245,245,245)',
              border: 'none',
              borderRadius: '4px',
              color: 'black',
              fontFamily: 'Avenir Next',
              fontWeight: 500,
              fontSize: '17px',
              '&:focus-visible': {
                outline: 'none',
              },
            },
            '& input::placeholder': {
              color: 'gray',
              fontFamily: 'Avenir Next',
              fontWeight: 500,
              opacity: 0.5,
              fontSize: '17px',
            },
          }}
        >
          <input
            placeholder="Enter your message"
            type="text"
            style={
              {
                // outline: errors.password ? '1px solid rgb(253, 37, 69)' : undefined,
              }
            }
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
          <button
            style={{
              cursor: 'pointer',
              background: '#256BFD',
              fontSize: '15px',
              color: '#fff',
              fontWeight: 600,
              fontFamily: 'Avenir Next',
              textTransform: 'none',
              height: '52px',
              padding: '10px',
              // width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '4px',
              border: 'none',
              WebkitTapHighlightColor: 'transparent',
            }}
            onClick={handleSendMessageClick}
          >
            <SendIcon />
          </button>
        </Box>
      </Box>
    </Box>
  );
}

export default Chat;
