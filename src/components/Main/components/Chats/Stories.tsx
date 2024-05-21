import React, { useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Stories from 'react-insta-stories';
import { useAppState } from '../../../../providers/AppProvider.hooks';
import { APP_COLORS } from '../../../../utils/constants';

function StoriesWrapper() {
  const { tips } = useAppState();
  const [open, setOpen] = useState(false);

  const stories = useMemo(() => {
    return tips.map((tip) => ({
      content: (props: any) => {
        // console.log('props', props);
        return (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(180deg, #6558FD 0%, #7951CE 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'sfpro500',
                color: APP_COLORS.textMain,
                margin: '20px',
                fontSize: '26px',
                textAlign: 'center',
              }}
            >
              {tip}
            </Typography>
          </Box>
        );
      },
    }));
  }, [tips]);

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      {tips.length > 0 && (
        <Box
          onClick={() => {
            setOpen(true);
          }}
          sx={{
            marginTop: '-10px',
            paddingBottom: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(180deg, #6558FD 0%, #7951CE 100%)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
            }}
          >
            <Box
              sx={{
                background: APP_COLORS.black,
                margin: '3px',
                height: 'calc(100% - 6px)',
                width: 'calc(100% - 6px)',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <TipsAndUpdatesIcon
                style={{
                  fontSize: '30px',
                  fill: '#FFD700',
                }}
              />
              {tips.length > 1 && (
                <Box
                  sx={{
                    minWidth: '24px',
                    minHeight: '24px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: '-5px',
                    right: '-5px',
                    background: 'white',
                    borderRadius: '50%',
                    fontSize: '12px',
                    fontFamily: 'sfpro700',
                  }}
                >
                  {tips.length}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
      {open && (
        <Box
          sx={{
            width: '100%',
            position: 'absolute',
            top: 0,
            bottom: 0,
            zIndex: 9,
          }}
        >
          <Stories
            onAllStoriesEnd={() => {
              setOpen(false);
            }}
            stories={stories}
            defaultInterval={2500}
            width={'100%'}
            height={'100%'}
          />
        </Box>
      )}
    </Box>
  );
}

export default StoriesWrapper;
