import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import ArrowBack from '../../../../assets/svg/arrow_back.svg';

import Footer from '../../../common/Footer/Footer';
import { APP_COLORS, APP_VIEW } from '../../../../utils/constants';
import { useAppState } from '../../../../providers/AppProvider.hooks';
import { linearProgressClasses } from '@mui/material/LinearProgress';

const CustomProgress = ({
  progress,
  color,
  secondaryColor,
}: {
  progress: number | undefined;
  color: string;
  secondaryColor: string;
}) => {
  return (
    <LinearProgress
      sx={{
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: secondaryColor,
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 10,
          backgroundColor: color,
        },
      }}
      variant="determinate"
      value={Number(progress) * 10}
    />
  );
};

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
              <Typography className="subTitle">{userProfile?.gender}</Typography>
              <Box className="divider"></Box>
              <Typography className="title">Age</Typography>
              <Typography className="subTitle">{userProfile?.age}</Typography>
              <Box className="divider"></Box>
              <Typography className="title">Search for</Typography>
              <Typography className="subTitle">{userProfile?.search_settings.search_gender}</Typography>
              <Box className="divider"></Box>
              <Typography className="title">Search age</Typography>
              <Typography className="subTitle">
                {userProfile?.search_settings.search_age_from} - {userProfile?.search_settings.search_age_to}
              </Typography>
            </Box>
            <Box
              sx={{
                margin: '30px 10px 20px',
              }}
            >
              <Typography className="subTitle">
                <span style={{ color: APP_COLORS.textMain, fontSize: '16px' }}>Level: </span>
                {userProfile?.profile.level.level}
              </Typography>
              <CustomProgress progress={userProfile?.profile.level.progress} color="#EEE" secondaryColor="#555" />
            </Box>
            <Box
              sx={{
                background: APP_COLORS.black,
                borderRadius: '10px',
                padding: '10px 0',
                margin: '10px',
              }}
            >
              <Typography className="title">Drive</Typography>
              <CustomProgress progress={userProfile?.profile.drive.progress} color="#4caf50" secondaryColor="#1b5e20" />
              <Box className="divider"></Box>
              <Typography className="title">Erudition</Typography>
              <CustomProgress
                progress={userProfile?.profile.erudition.progress}
                color="#03a9f4"
                secondaryColor="#01579b"
              />

              <Box className="divider"></Box>
              <Typography className="title">Horny</Typography>
              <CustomProgress progress={userProfile?.profile.horny.progress} color="#ff9800" secondaryColor="#e65100" />

              <Box className="divider"></Box>
              <Typography className="title">Pretty</Typography>
              <CustomProgress
                progress={userProfile?.profile.pretty.progress}
                color="#ef5350"
                secondaryColor="#c62828"
              />

              <Box className="divider"></Box>
              <Typography className="title">Romantic</Typography>
              <CustomProgress
                progress={userProfile?.profile.romantic.progress}
                color="#ba68c8"
                secondaryColor="#7b1fa2"
              />
            </Box>
          </Box>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}

export default Settings;
