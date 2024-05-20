import React, { useRef } from 'react';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useAppState } from '../../../../providers/AppProvider.hooks';

function Advertisement() {
  const { advertisement, setAdvertisementVisibility, advertisementVisibility } = useAppState();
  const boxRef = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    setAdvertisementVisibility(false);
  };

  return (
    <>
      {advertisement !== null && (
        <Box
          ref={boxRef}
          sx={{
            color: 'white',
            position: 'relative',
            marginTop: advertisementVisibility ? '0px' : `-${boxRef.current?.clientHeight}px`,
            transition: `all 1s ease`,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              padding: '10px 25px 10px 10px',
              background: 'linear-gradient(180deg, #6558FD 0%, #7951CE 100%)',
              margin: '10px',
              borderRadius: '10px',
            }}
          >
            <Box
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: 15,
                right: 15,
              }}
            >
              <CloseIcon />
            </Box>
            {advertisement}
          </Box>
        </Box>
      )}
    </>
  );
}

export default Advertisement;
