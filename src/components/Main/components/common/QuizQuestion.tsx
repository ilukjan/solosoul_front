import { Typography } from '@mui/material';

import QuizContainer from './QuizContainer';

function QuizQuestion({ text, textAlign, margin }: { text: string; textAlign?: string; margin?: string }) {
  return (
    <>
      <QuizContainer>
        <Typography
          sx={{
            fontFamily: 'sfpro400',
            color: '#fff',
            fontSize: '32px',
            margin: margin ?? '32px 0',
            textAlign: textAlign ?? 'left',
          }}
        >
          {text}
        </Typography>
      </QuizContainer>
    </>
  );
}

export default QuizQuestion;
