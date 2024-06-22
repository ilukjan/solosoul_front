import React, { useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

import background from './assets/images/sign_in_bg.webp';
import { useAppState } from './providers/AppProvider.hooks';
import { APP_COLORS } from './utils/constants';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { handleSignIn, setSignInError, signInError, isSignInLoading } = useAppState();

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
          background: '#0b1e25',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            minHeight: '250px',
            width: '250px',
            backgroundImage: `url(${background})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Box
            sx={{
              boxShadow: 'inset 0px 0px 50px 55px #0b1e25',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Box
            sx={{
              padding: '0px 24px 34px',
              display: 'flex',
              flexDirection: 'column',
              background: 'linear-gradient(#0b1e25, #000)',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'sfpro700',
                fontSize: '34px',
                lineHeight: '38px',
                marginBottom: '34px',
                color: APP_COLORS.textMain,
                // marginBottom: '20px',
              }}
            >
              Welcome to Solo Soul!
            </Typography>
            <Box
              sx={{
                width: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '16px',
                '& input': {
                  width: '100%',
                  textIndent: '20px',
                  height: '52px',
                  background: 'transparent',
                  border: '1px solid grey',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  padding: 0,
                  color: APP_COLORS.textMain,
                  fontFamily: 'sfpro500',
                  fontSize: '17px',
                  '&:focus-visible': {
                    outline: 'none',
                  },
                },
                '& input::placeholder': {
                  color: 'gray',
                  fontFamily: 'sfpro500',
                  opacity: 0.5,
                  fontSize: '17px',
                },
                '& p': {
                  fontSize: '14px',
                  color: APP_COLORS.textMain,
                  marginBottom: '4px',
                  fontFamily: 'sfpro400',
                },
                '& .textWrapper': {
                  fontFamily: 'sfpro400',
                  display: 'flex',
                  justifyContent: 'space-between',
                },
                '& .error': {
                  fontFamily: 'sfpro400',
                  color: 'rgb(253, 37, 69)',
                },
              }}
            >
              <Box className="textWrapper">
                <Typography>Username</Typography>
                {/* {errors.username && <Typography className="error">Username already exists</Typography>} */}
              </Box>
              <input
                placeholder="Enter your username"
                type="email"
                style={
                  {
                    // outline: errors.username ? '1px solid rgb(253, 37, 69)' : undefined,
                  }
                }
                value={username}
                onChange={(e) => {
                  setSignInError(false);
                  setUsername(e.target.value);
                }}
              ></input>
              <Box className="textWrapper">
                <Typography>Password</Typography>
                {/* {errors.password && <Typography className="error">Min 6 symbols</Typography>} */}
              </Box>
              <input
                placeholder="Enter your password"
                type="password"
                style={
                  {
                    // outline: errors.password ? '1px solid rgb(253, 37, 69)' : undefined,
                  }
                }
                value={password}
                onChange={(e) => {
                  setSignInError(false);
                  setPassword(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isSignInLoading) {
                    handleSignIn(username, password);
                  }
                }}
              ></input>
              {signInError && <Typography className="error">Invalid credentials</Typography>}

              <Typography
                onClick={() => {
                  // setRestorePasswordModalOpen(true);
                }}
                sx={{
                  fontFamily: 'sfpro600',
                  color: `${APP_COLORS.blue}!important`,
                  textAlign: 'right',
                  marginTop: '-8px',
                  cursor: 'pointer',
                }}
              >
                Forgot password?
              </Typography>
            </Box>

            <button
              style={{
                cursor: 'pointer',
                background: APP_COLORS.blue,
                fontSize: '15px',
                color: '#fff',
                fontFamily: 'sfpro600',

                textTransform: 'none',
                height: '56px',
                width: '100%',
                borderRadius: '12px',
                border: 'none',
                WebkitTapHighlightColor: 'transparent',
              }}
              onClick={() => {
                handleSignIn(username, password);
              }}
            >
              {isSignInLoading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: '#fff',
                  }}
                />
              ) : (
                <>Sign in</>
              )}
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SignIn;
