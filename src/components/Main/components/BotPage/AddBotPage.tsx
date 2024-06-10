import React, { useMemo, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import ArrowBack from '../../../../assets/svg/arrow_back.svg';
import { APP_COLORS, APP_VIEW, Gender } from '../../../../utils/constants';
import { useAppState } from '../../../../providers/AppProvider/AppProvider.hooks';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SearchIcon from '@mui/icons-material/Search';
import QuizSelect from '../common/QuizSelect';
import QuizButton, { ButtonType } from '../common/QuizButton';
import { ConversationBot } from '../../../../services/requests';

function AddBotPage() {
  const {
    isAddBotLoading,
    //  handleFetchNewBot, addBotData,
    setSelectedAppView,
  } = useAppState();
  const [botProfile, setBotProfile] = useState<ConversationBot | null>(null);
  const [gender, setGender] = useState<string>('');
  const [nation, setNation] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [figure, setFigure] = useState<string>('');

  const handleSearch = () => {
    console.log('data', gender, nation, age, figure);
    setBotProfile({
      id: 'string;',
      username: 'Lara Croft',
      settings: {
        gender: 'Female',
        age: 29,
      },
      profile: {
        bio: 'Some description description description description description description description',
      },
      img: 'https://cdn.britannica.com/16/254816-050-41C9577A/Google-logo-Googleplex-headquarters-Mountain-View-California.jpg',
    });
  };

  const Ages = [
    {
      value: 20,
      label: '20 - 30',
    },
    {
      value: 30,
      label: '30 - 40',
    },
    {
      value: 40,
      label: '40 - 50',
    },
    {
      value: 50,
      label: '50 - 60',
    },
  ];
  const Genders = [
    {
      value: Gender.MALE,
      label: 'Male',
    },
    {
      value: Gender.FEMALE,
      label: 'Female',
    },
    {
      value: Gender.NON_BINARY,
      label: 'Non-binary',
    },
  ];

  const Nations = [
    {
      value: 'European',
      label: 'European',
    },
    {
      value: 'Asian',
      label: 'Asian',
    },
    {
      value: 'African',
      label: 'African',
    },
  ];
  const Figures = [
    {
      value: 'Slim',
      label: 'Slim',
    },
    {
      value: 'Regular',
      label: 'Regular',
    },
    {
      value: 'Plus_Size',
      label: 'Plus size',
    },
  ];
  const isSearchDisabled = useMemo(() => {
    return gender === '' || nation === '' || age === '' || figure === '';
  }, [gender, age, nation, figure]);

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
              setSelectedAppView(APP_VIEW.MAIN);
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
                  // border: '1px solid red',
                }}
              >
                <Box
                  sx={{
                    minHeight: '100px',
                    '& img': {
                      maxWidth: '100%',
                      // border: '1px solid red',
                    },
                  }}
                >
                  {botProfile && <img src={botProfile?.img} alt="profile"></img>}
                </Box>
              </Box>
              {botProfile && (
                <Box
                  sx={{
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
              )}
            </>
          )}
          <Box
            sx={{
              padding: '10px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <QuizSelect
                  label="Gender"
                  values={Genders}
                  value={gender}
                  onChange={(e) => {
                    setGender(String(e.target.value));
                  }}
                />
                <QuizSelect
                  label="Nation"
                  values={Nations}
                  value={nation}
                  onChange={(e) => {
                    setNation(String(e.target.value));
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <QuizSelect
                  label="Age"
                  values={Ages}
                  value={age}
                  onChange={(e) => {
                    setAge(String(e.target.value));
                  }}
                />
                <QuizSelect
                  label="Figure"
                  values={Figures}
                  value={figure}
                  onChange={(e) => {
                    setFigure(String(e.target.value));
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              padding: '20px 10px',
            }}
          >
            {botProfile ? (
              <Box
                sx={{
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <QuizButton text="Search new" onClick={handleSearch} variant={ButtonType.BLACK}>
                  <SearchIcon style={{ marginLeft: '10px' }} />
                </QuizButton>
                <QuizButton text="Add this" onClick={handleSearch} variant={ButtonType.APP}>
                  <PersonAddAlt1Icon style={{ marginLeft: '10px' }} />
                </QuizButton>
              </Box>
            ) : (
              <QuizButton
                text="Search!"
                onClick={handleSearch}
                variant={isSearchDisabled ? ButtonType.APP_DISABLED : ButtonType.APP}
              ></QuizButton>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AddBotPage;
