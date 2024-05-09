import React from 'react';
import { Box, Typography } from '@mui/material';
import ArrowBack from '../../../../assets/svg/arrow_back.svg';

import Footer from '../../../common/Footer/Footer';
import { APP_COLORS, APP_VIEW } from '../../../../utils/constants';
import { useAppState } from '../../../../providers/AppProvider.hooks';

function Settings() {
  const { setSelectedAppView, userProfile } = useAppState();
  const handleClickBack = () => {
    setSelectedAppView(APP_VIEW.MAIN);
  };
  console.log('user', userProfile);
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
              top: 0,
              width: '100%',
              maxWidth: '430px',
              padding: '20px 0',
              zIndex: 9,
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
              <img src={userProfile?.img} alt="profile"></img>
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
                {userProfile?.username}
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
              background: APP_COLORS.black,
              borderRadius: '10px',
              padding: '10px 0',
              margin: '10px',
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
            }}
          >
            <Typography className="title">Gender</Typography>
            <Typography className="subTitle">{userProfile?.gender}</Typography>
            <Box className="divider"></Box>
            <Typography className="title">Age</Typography>
            <Typography className="subTitle">{userProfile?.age}</Typography>
          </Box>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}

export default Settings;
