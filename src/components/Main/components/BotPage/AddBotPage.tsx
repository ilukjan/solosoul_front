import React, { useMemo } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import ArrowBack from '../../../../assets/svg/arrow_back.svg';
import { APP_COLORS } from '../../../../utils/constants';
import { useAppState } from '../../../../providers/AppProvider.hooks';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonOffIcon from '@mui/icons-material/PersonOff';

function AddBotPage() {
  const { isAddBotLoading, handleFetchNewBot, isAddBotOpen, addBotData, setAddBotOpen } = useAppState();

  const botProfile = useMemo(() => {
    return addBotData?.bot;
  }, [addBotData]);

  if (!isAddBotOpen) return null;

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
            onClick={() => {
              setAddBotOpen(false);
            }}
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
          {isAddBotLoading ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress
                size={50}
                sx={{
                  '& .MuiCircularProgress-svg': {
                    color: '#6558FD',
                  },
                }}
              ></CircularProgress>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    minHeight: '200px',
                    '& img': {
                      maxWidth: '100%',
                    },
                  }}
                >
                  <img src={botProfile?.img} alt="profile"></img>
                </Box>
              </Box>
              <Box
                sx={{
                  marginBottom: '120px',
                  '& .title': {
                    fontFamily: 'sfpro400',
                    fontSize: '14px',
                    color: APP_COLORS.textMain,
                    margin: '0 10px',
                  },
                  '& .subTitle': {
                    fontFamily: 'sfpro400',
                    fontSize: '16px',
                    margin: '0 10px',
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
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0 10px',
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
                    <Typography className="subTitle">
                      {botProfile?.settings.gender}, {botProfile?.settings.age}
                    </Typography>
                  </Box>
                  <Box className="divider"></Box>
                  <Typography className="title">{botProfile?.profile.bio}</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  maxWidth: '430px',
                  bottom: 0,
                  display: 'flex',
                  justifyContent: 'space-around',
                  boxShadow: `inset 0px -135px 25px -28px ${APP_COLORS.darkBlack}`,
                  padding: '10px 0',
                }}
              >
                <PersonOffIcon
                  onClick={() => handleFetchNewBot('decline')}
                  sx={{ color: 'error.main', width: '100px', height: '100px', opacity: 0.8 }}
                ></PersonOffIcon>
                <PersonAddAlt1Icon
                  onClick={() => handleFetchNewBot('accept')}
                  sx={{ color: 'success.main', width: '100px', height: '100px' }}
                ></PersonAddAlt1Icon>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default AddBotPage;
