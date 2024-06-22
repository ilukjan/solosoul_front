import React from 'react';
import { Box } from '@mui/material';

function QuizContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: '460px',
          width: '100%',
          padding: '0 20px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default QuizContainer;
