import { Box, Typography } from '@mui/material';


function QuizHeader({
  stepNumber,
  stepsNumber,
  onBack,
}: {
  stepsNumber: number;
  stepNumber: number;
  onBack: () => void;
}) {
  const fillPercentage = 100 * (stepNumber / stepsNumber);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <Box display={'flex'} justifyContent={'space-between'} margin={'20px 0'} padding={'0 20px'}>
          <Box
            onClick={onBack}
            sx={{
              cursor: 'pointer',
              transition: 'all ease 0.3s',
              '&:hover': {
                opacity: 0.6,
              },
            }}
          >
            <img src={'ArrowBackSvg'} alt="arrow back"></img>
          </Box>
          <Typography
            sx={{
              fontFamily: 'Kalnia500',
              fontSize: '20px',
              color: '#fff',
            }}
          >
            {stepNumber} of {stepsNumber}
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            maxWidth: '460px',
            margin: 'auto',
            height: '4px',
            background: `linear-gradient(to right,#E1413E 0%,#E1413E ${fillPercentage}%,#18182E ${fillPercentage}%,#18182E 100%)`,
          }}
        ></Box>
      </Box>
    </Box>
  );
}

export default QuizHeader;
