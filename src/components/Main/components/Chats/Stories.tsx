import React from 'react';
import { Box } from '@mui/material';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Stories from 'react-insta-stories';
import { useAppState } from '../../../../providers/AppProvider.hooks';
import { APP_COLORS } from '../../../../utils/constants';

function StoriesWrapper() {
  const { tips } = useAppState();

  console.log('tips', tips);
  const stories = [
    {
      url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
      // seeMore: SeeMoreComponent, // when expanded
      // seeMoreCollapsed: customCollapsedComponent, // when collapsed
    },
    {
      url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
      // seeMore: SeeMoreComponent, // when expanded
      // seeMoreCollapsed: customCollapsedComponent, // when collapsed
    },
  ];
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      {tips.length > 0 && (
        <Box
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
      {/* <Box sx={{
        border: '1px solid red',
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 9999,
        background: 'white'
      }}>
      <Stories stories={stories} defaultInterval={1500} width={432} height={768} />
      </Box> */}
    </Box>
  );
}

export default StoriesWrapper;
