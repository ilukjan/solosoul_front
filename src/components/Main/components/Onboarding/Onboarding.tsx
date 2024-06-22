import React, {  useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useAppState } from '../../../../providers/AppProvider/AppProvider.hooks';
import { APP_VIEW, Gender } from '../../../../utils/constants';
import { UserProfileResponse, addUserAccountInfo } from '../../../../services/requests';
import { useSignIn } from '../../../../providers/SignInProvider/SignInProvider.hooks';
import { toast } from 'react-toastify';
import QuizStepBackgroundWrapper from '../common/QuizStepBackgroundWrapper';
import QuizQuestion from '../common/QuizQuestion';
import QuizContainer from '../common/QuizContainer';
import QuizButton, { ButtonType } from '../common/QuizButton';
import QuizSelect from '../common/QuizSelect';

export type OnboardingUserData = {
  gender: Gender | null;
  age: string | number | null;
};


function Onboarding() {
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingLoading, setOnboardingLoading] = useState(false);
  const { userId, userAccessToken } = useSignIn();
  const { setUserProfile, setSelectedAppView } = useAppState();
  const [gender, setGender] = useState<string | null>(null);


  const handleSaveUserData = (age:number|string) => {
    setOnboardingLoading(true);

    // REMOVE
    // setUserProfile({account: {
    //   gender: gender!,
    //   age: Number(age),
    //   img: ''
    // }}as any)
    // setSelectedAppView(APP_VIEW.ADD_BOT)

    // REMOVE

    if (userId && userAccessToken) {
      addUserAccountInfo(userId, userAccessToken, gender!, Number(age))
        .then((data: UserProfileResponse['account']) => {
          toast(`Set account success`, { type: 'success', hideProgressBar: true });
          setUserProfile((prev) => (prev ? { ...prev, account: data } : prev));
          setSelectedAppView(APP_VIEW.ADD_BOT)
        })
        .catch((err) => {
          toast(`Set account error: ${err}`, { type: 'error', hideProgressBar: true });
        });
    }
  }

  const handleClickGender = (gender: Gender) => {
    setGender(gender)
    setOnboardingStep((prev) => prev + 1);
  };


  const Years = () =>
    new Array(82)
      .fill(null)
      .map((el, index) => index + 18)
      .map((year) => ({
        value: year,
        label: year,
      }));

  if (onboardingLoading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={80}></CircularProgress>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        backgroundColor: '#01091C',
        minHeight: '100dvh',
        height: '100%',
      }}
    >
      {onboardingStep === 1 && (
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
              <QuizButton
                onClick={() => handleClickGender(Gender.MALE)}
                variant={ButtonType.WHITE}
                text="Male"
              ></QuizButton>
              <QuizButton
                onClick={() => handleClickGender(Gender.FEMALE)}
                variant={ButtonType.WHITE}
                text="Female"
              ></QuizButton>
              <QuizButton
                onClick={() => handleClickGender(Gender.NON_BINARY)}
                variant={ButtonType.WHITE}
                text="Non-binary"
              ></QuizButton>
            </Box>
          </QuizContainer>
        </QuizStepBackgroundWrapper>
      )}
      {onboardingStep === 2 && (
        <QuizStepBackgroundWrapper>
          <QuizQuestion text="What’s your age?"></QuizQuestion>
          <QuizContainer>
            <QuizSelect
              label="Year"
              values={Years()}
              value={18}
              onChange={(e) => {
                  handleSaveUserData(e.target.value)
              }}
            />
          </QuizContainer>
        </QuizStepBackgroundWrapper>
      )}
    </Box>
  );
}

export default Onboarding;
