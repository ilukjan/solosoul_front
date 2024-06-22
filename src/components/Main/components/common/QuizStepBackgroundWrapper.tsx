import React from 'react';
import { Box, useMediaQuery } from '@mui/material';

function QuizStepBackgroundWrapper({
  children,
  withoutBottom = false,
  fullHeight = false,
}: {
  children: React.ReactNode;
  withoutBottom?: boolean;
  fullHeight?: boolean;
}) {
  const isMobile = useMediaQuery('(max-width:500px)');

  return (
    <Box
      sx={{
        height: '100%',
        minHeight: '100dvh',
        // background: isMobile
        //   ? `url(${withoutBottom ? undefined : mob_intro_bottom}), url(${mob_bg})`
        //   : `url(${desktop_bg})`,
        backgroundSize: isMobile ? 'contain, cover' : 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: isMobile ? `bottom, center ${!fullHeight && '75px'}` : 'center',
      }}
    >
      {children}
    </Box>
  );
}

export default QuizStepBackgroundWrapper;
