import React, { useEffect, useState } from 'react';
import { Box, Button, LinearProgress, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import ArrowBack from '../../../../assets/svg/arrow_back.svg';

import Footer from '../../../common/Footer/Footer';
import { APP_COLORS, APP_VIEW } from '../../../../utils/constants';
import { useAppState } from '../../../../providers/AppProvider.hooks';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTelegram } from '../../../../providers/TelegramProvider/TelegramProvider';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <>{children}</>}
    </div>
  );
}

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
  const { setSelectedAppView, userProfile, fetchUserData, handleUpdateSettings } = useAppState();
  const { user } = useTelegram();
  const [searchFor, setSearchFor] = useState(userProfile?.search_settings.search_gender);
  const [searchAgeFrom, setSearchAgeFrom] = useState(String(userProfile?.search_settings.search_age_from));
  const [searchAgeTo, setSearchAgeTo] = useState(String(userProfile?.search_settings.search_age_to));
  const handleClickBack = () => {
    setSelectedAppView(APP_VIEW.MAIN);
  };

  const handleChangeSearchFor = (event: SelectChangeEvent) => {
    setSearchFor(event.target.value);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const ageValues = (minValue?: number | string) => {
    const values = [18, 25, 30, 40, 50, 60, 70, 80, 90];
    const valuesToSearch = minValue ? values.filter((val) => val > Number(minValue)) : values;

    return valuesToSearch.map((value) => (
      <MenuItem value={value} key={value}>
        <Typography className="subTitle">{value}</Typography>
      </MenuItem>
    ));
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
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
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
                {user?.first_name} {user?.last_name}
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

          <Box sx={{ width: '100%' }}>
            <Tabs
              sx={{
                paddingBottom: '10px',
                '& .MuiButtonBase-root, .Mui-selected': {
                  color: 'white!important',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: 'white',
                },
              }}
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value={0} label="Profile" />
              <Tab value={1} label="Topics" />
              <Tab value={2} label="Settings" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
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
                  margin: '10px 10px 20px',
                }}
              >
                <Typography className="title">Gender</Typography>
                <Typography className="subTitle">{userProfile?.gender}</Typography>
                <Box className="divider"></Box>
                <Typography className="title">Age</Typography>
                <Typography className="subTitle">{userProfile?.age}</Typography>
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
                <CustomProgress
                  progress={userProfile?.profile.drive.progress}
                  color="#4caf50"
                  secondaryColor="#1b5e20"
                />
                <Box className="divider"></Box>
                <Typography className="title">Erudition</Typography>
                <CustomProgress
                  progress={userProfile?.profile.erudition.progress}
                  color="#03a9f4"
                  secondaryColor="#01579b"
                />

                <Box className="divider"></Box>
                <Typography className="title">Horny</Typography>
                <CustomProgress
                  progress={userProfile?.profile.horny.progress}
                  color="#ff9800"
                  secondaryColor="#e65100"
                />

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
          </TabPanel>
          <TabPanel value={value} index={1}>
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
              }}
            >
              <Box
                sx={{
                  padding: '10px 10px 20px',
                }}
              >
                <Typography className="subTitle" marginBottom={'10px'}>
                  <span style={{ color: APP_COLORS.textMain, fontSize: '16px', marginLeft: '-10px' }}>Level: </span>
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
                {userProfile?.search_settings.topics.map((topic, index, arr) => (
                  <Box
                    key={index}
                    sx={{
                      opacity: topic.topic_is_enabled ? 1 : 0.4,
                    }}
                  >
                    <Typography className="subTitle">{topic.topic_name}</Typography>
                    <Typography className="title">{topic.topic_description}</Typography>
                    {index !== arr.length - 1 && <Box className="divider"></Box>}
                  </Box>
                ))}
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
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
                  margin: '20px 0',
                  opacity: 0.5,
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
                <Typography className="title">Search for</Typography>
                <Box
                  sx={{
                    margin: '10px',
                  }}
                >
                  <Select
                    sx={{
                      width: '100%',
                    }}
                    variant="standard"
                    value={searchFor}
                    onChange={handleChangeSearchFor}
                  >
                    <MenuItem value={'Male'}>
                      <Typography className="subTitle">Male</Typography>
                    </MenuItem>
                    <MenuItem value={'Female'}>
                      <Typography className="subTitle">Female</Typography>
                    </MenuItem>
                  </Select>
                </Box>
                <Box className="divider"></Box>
                <Typography className="title">Search age</Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '10px',
                  }}
                >
                  <Select
                    sx={{
                      minWidth: '55px',
                    }}
                    variant="standard"
                    value={searchAgeFrom}
                    onChange={(event: SelectChangeEvent) => {
                      setSearchAgeFrom(event.target.value);
                    }}
                  >
                    {ageValues()}
                  </Select>
                  <Typography
                    sx={{
                      marginLeft: '0px!important',
                    }}
                    className="subTitle"
                  >
                    -
                  </Typography>
                  <Select
                    sx={{
                      minWidth: '55px',
                    }}
                    variant="standard"
                    value={searchAgeTo}
                    onChange={(event: SelectChangeEvent) => {
                      setSearchAgeTo(event.target.value);
                    }}
                  >
                    {ageValues(searchAgeFrom)}
                  </Select>
                </Box>
              </Box>
              <Box
                sx={{
                  padding: '10px',
                }}
              >
                <Button
                  onClick={() => {
                    handleUpdateSettings(searchFor || '', Number(searchAgeFrom), Number(searchAgeTo));
                  }}
                  variant="contained"
                  sx={{
                    color: 'white',
                    borderRadius: '10px',
                    width: '100%',
                    background: 'linear-gradient(180deg, #6558FD 0%, #7951CE 100%)',
                  }}
                >
                  Update settings
                </Button>
              </Box>
            </Box>
          </TabPanel>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}

export default Settings;
