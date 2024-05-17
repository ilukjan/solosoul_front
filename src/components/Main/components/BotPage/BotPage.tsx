import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import ArrowBack from '../../../../assets/svg/arrow_back.svg';

import { APP_COLORS } from '../../../../utils/constants';
import { useAppState } from '../../../../providers/AppProvider.hooks';

function BotPage() {
  const { selectedBotId, setSelectedBotId, conversations } = useAppState();

  const handleClickBack = () => {
    setSelectedBotId(null);
  };

  const botProfile = useMemo(() => {
    return conversations.find((conv) => conv.bot.id === selectedBotId)?.bot;
  }, [selectedBotId, conversations]);

  console.log('botProfile', botProfile);

  if (!selectedBotId) return null;

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
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              position: 'fixed',
              top: 0,
              width: '100%',
              maxWidth: '430px',
              padding: '20px 0',
              zIndex: 9,
              boxShadow: 'inset 0px 55px 55px -43px rgba(66, 68, 90, 1)',
            }}
            onClick={handleClickBack}
          >
            <Box
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
                Back
              </Typography>
            </Box>
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
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <Box
              sx={{
                opacity: 0.7,
                minHeight: '200px',
                '& img': {
                  maxWidth: '100%',
                },
              }}
            >
              <img src={botProfile?.img} alt="profile"></img>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                margin: '15px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'sfpro400',
                  fontSize: '18px',
                  color: APP_COLORS.textMain,
                  textShadow: '1px 1px 2px #000',
                }}
              >
                {botProfile?.username}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'sfpro400',
                  fontSize: '14px',
                  color: APP_COLORS.textSecondary,
                  textShadow: '1px 1px 2px #000',
                }}
              >
                last seen recently
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              marginBottom: '20px',
              '& .title': {
                fontFamily: 'sfpro400',
                fontSize: '14px',
                color: APP_COLORS.textMain,
                marginLeft: '10px',
              },
              '& .subTitle': {
                fontFamily: 'sfpro400',
                fontSize: '16px',
                marginLeft: '10px',
                color: APP_COLORS.blue,
              },
              '& .divider': {
                height: '1px',
                width: '100%',
                background: APP_COLORS.border,
                margin: '10px 0',
                opacity: 0.5,
              },
              '& .MuiLinearProgress-root': {
                height: '20px',
                borderRadius: '10px',
                margin: '10px',
              },
              '& .MuiLinearProgress-bar': {
                borderRadius: '10px',
              },
            }}
          >
            <Box
              sx={{
                background: APP_COLORS.black,
                borderRadius: '10px',
                padding: '10px 0',
                margin: '10px',
              }}
            >
              <Typography className="title">Gender</Typography>
              <Typography className="subTitle">{botProfile?.settings.gender}</Typography>
              <Box className="divider"></Box>
              <Typography className="title">Age</Typography>
              <Typography className="subTitle">{botProfile?.settings.age}</Typography>
              <Box className="divider"></Box>
              <Typography className="subTitle">{botProfile?.profile.bio}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default BotPage;
