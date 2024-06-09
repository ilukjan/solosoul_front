import { Box } from '@mui/material';
import { useAppState } from '../../../../../providers/AppProvider/AppProvider.hooks';
import QuizStepBackgroundWrapper from '../../common/QuizStepBackgroundWrapper';
import QuizQuestion from '../../common/QuizQuestion';
import QuizContainer from '../../common/QuizContainer';
import QuizButton, { ButtonType } from '../../common/QuizButton';
import { Gender } from '../../../../../utils/constants';
import { OnboardingUserData } from '../Onboarding';

function Step1({
  setUserData,
  setOnboardingStep,
}: {
  setUserData: React.Dispatch<React.SetStateAction<OnboardingUserData>>;
  setOnboardingStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleClick = (type: Gender) => {
    setUserData((prev) => ({
      ...prev,
      gender: type,
    }));
    setOnboardingStep((prev) => prev + 1);
  };

  return (
    <QuizStepBackgroundWrapper>
      <QuizQuestion text="What’s your gender?"></QuizQuestion>
      <QuizContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <QuizButton onClick={() => handleClick(Gender.MALE)} variant={ButtonType.WHITE} text="Male"></QuizButton>
          <QuizButton onClick={() => handleClick(Gender.FEMALE)} variant={ButtonType.WHITE} text="Female"></QuizButton>
          <QuizButton
            onClick={() => handleClick(Gender.NON_BINARY)}
            variant={ButtonType.WHITE}
            text="Non-binary"
          ></QuizButton>
        </Box>
      </QuizContainer>
    </QuizStepBackgroundWrapper>
  );
}

export default Step1;
