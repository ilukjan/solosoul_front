import React from 'react';
import { Box, Typography } from '@mui/material';

import Footer from '../../../common/Footer/Footer';

function Settings() {
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
          // justifyContent: 'flex-end',
          // backgroundColor: '#EEE',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            marginBottom: '10px',
          }}
        >
          <Box
            sx={{
              margin: '50px',
            }}
          >
            <Typography>Coming soon ...</Typography>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default Settings;
