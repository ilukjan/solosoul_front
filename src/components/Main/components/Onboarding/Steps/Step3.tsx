import { Box, Typography } from '@mui/material';
import { useAppState } from '../../../../../providers/AppProvider/AppProvider.hooks';
import QuizStepBackgroundWrapper from '../../common/QuizStepBackgroundWrapper';
import QuizHeader from '../../common/QuizHeader';
import QuizQuestion from '../../common/QuizQuestion';
import QuizContainer from '../../common/QuizContainer';
import QuizButton, { ButtonType } from '../../common/QuizButton';
import { Gender } from '../../../../../utils/constants';
import QuizSelect from '../../common/QuizSelect';

function Step2() {
  const handleClick = (type: any) => {
    // setQuizData((prev) => ({
    //   ...prev,
    //   gender: type,
    // }));
    // setStep((prev) => prev + 1);
  };  const Years = () =>
    new Array(82).fill(null).map((el, index) => index + 18).map((year) => ({
      value: year,
      label: year,
    }));

    const Genders = () => [
      {
        value: Gender.MALE,
        label: Gender.MALE,
      },
      {
        value: Gender.FEMALE,
        label: Gender.FEMALE,
      },
      {
        value: Gender.NON_BINARY,
        label: Gender.NON_BINARY,
      },
    ];

    const Nations =  [
      {
        value: 'European',
        label: 'European',
      },
      {
        value: 'Asian',
        label: 'Asian',
      },
      {
        value: 'African',
        label: 'African',
      },
    ];
const Figures = [
  {
    value: 'Slim',
    label: 'Slim',
  },{
    value: 'Regular',
    label: 'Regular',
  },{
    value: 'Plus_Size',
    label: 'Plus_Size',
  },
]
  return (
    <QuizStepBackgroundWrapper>
      <QuizHeader
        onBack={() => {
          // setStep((prev) => prev - 2);
        }}
        stepNumber={3}
        stepsNumber={3}
      ></QuizHeader>
       <QuizQuestion text="Who are you looking for"></QuizQuestion>
      <QuizContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <QuizSelect
      label="Genders"
      values={Genders()}
      value={''}
      onChange={()=>{}}
    />
          {/* <QuizButton onClick={() => handleClick(Gender.MALE)} variant={ButtonType.WHITE} text="Male"></QuizButton>
          <QuizButton onClick={() => handleClick(Gender.FEMALE)} variant={ButtonType.WHITE} text="Female"></QuizButton>
          <QuizButton
            onClick={() => handleClick(Gender.NON_BINARY)}
            variant={ButtonType.WHITE}
            text="Non-binary"
          ></QuizButton> */}
        </Box>
        <QuizQuestion text="Select nationality"></QuizQuestion>
        <QuizSelect
      label="Nations"
      values={Nations}
      value={''}
      onChange={()=>{}}
    />
<QuizQuestion text="Select age"></QuizQuestion>
<QuizSelect
      label="Year"
      values={Years()}
      value={18}
      onChange={()=>{}}
    />
<QuizQuestion text="Select figure"></QuizQuestion>
<QuizSelect
      label="Figures"
      values={Figures}
      value={18}
      onChange={()=>{}}
    />



      </QuizContainer>
<Box sx={{
  padding: '20px'
}}>

<QuizButton onClick={() => handleClick(Gender.FEMALE)} variant={ButtonType.WHITE} text="Search!"></QuizButton>
</Box>


    </QuizStepBackgroundWrapper>
  );
}

export default Step2;
