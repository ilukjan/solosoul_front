import {  SelectChangeEvent } from '@mui/material';
import { useAppState } from '../../../../../providers/AppProvider/AppProvider.hooks';
import QuizStepBackgroundWrapper from '../../common/QuizStepBackgroundWrapper';
import QuizQuestion from '../../common/QuizQuestion';
import QuizContainer from '../../common/QuizContainer';
import QuizSelect from '../../common/QuizSelect';
import { OnboardingUserData } from '../Onboarding';

function Step2({
  handleSaveUserData,
}: {
  handleSaveUserData: (v:number) => void;
}) {
  const handleChange = (e: SelectChangeEvent<string | number>) => {
    handleSaveUserData(Number(e.target.value));
  };

  const Years = () =>
    new Array(82)
      .fill(null)
      .map((el, index) => index + 18)
      .map((year) => ({
        value: year,
        label: year,
      }));

  return (
    <QuizStepBackgroundWrapper>
      {/* <QuizHeader
        onBack={() => {
          setOnboardingStep((prev) => prev - 1);
        }}
        stepNumber={2}
        stepsNumber={3}
      ></QuizHeader> */}
      <QuizQuestion text="What’s your age?"></QuizQuestion>
      <QuizContainer>
        <QuizSelect label="Year" values={Years()} value={18} onChange={handleChange} />
      </QuizContainer>
    </QuizStepBackgroundWrapper>
  );
}

export default Step2;
