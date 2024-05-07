import React, { useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

import background from './assets/images/sign_in/sign_in_background_small@2x.jpg';
import { useAppState } from './providers/AppProvider.hooks';

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
          backgroundImage: `url(${background})`,
          backgroundSize: 'contain',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Box
          sx={{
            padding: '0px 24px 34px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '34px',
              lineHeight: '38px',
              marginBottom: '24px',
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
                background: 'rgb(245,245,245)',
                border: 'none',
                borderRadius: '12px',
                marginBottom: '16px',
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
              '& p': {
                fontFamily: 'Avenir Next',
                fontWeight: 400,
                fontSize: '13px',
                marginBottom: '4px',
              },
              '& .textWrapper': {
                display: 'flex',
                justifyContent: 'space-between',
              },
              '& .error': {
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
                fontWeight: '600!important',
                color: 'rgb(37, 107, 253)',
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
              background: '#256BFD',
              fontSize: '15px',
              color: '#fff',
              fontWeight: 600,
              fontFamily: 'Avenir Next',
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
  );
}

export default SignIn;
