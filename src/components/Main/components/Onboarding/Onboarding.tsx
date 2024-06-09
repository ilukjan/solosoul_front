import React, { useEffect, useId, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import {
  Step1,
  Step2,
  Step3,
} from './Steps';
import { useAppState } from '../../../../providers/AppProvider/AppProvider.hooks';
import { Gender } from '../../../../utils/constants';
import { UserProfileResponse, addUserAccountInfo } from '../../../../services/requests';
import { useSignIn } from '../../../../providers/SignInProvider/SignInProvider.hooks';
import { toast } from 'react-toastify';

export type OnboardingUserData ={
  gender: Gender | null;
  age: number | null;
}

const getStep = (
  stepNumber: number,
  setUserData: React.Dispatch<React.SetStateAction<OnboardingUserData>>,
  setOnboardingStep: React.Dispatch<React.SetStateAction<number>>,
  handleSaveUserData: (age:number) => void
) => {
  switch (stepNumber) {
    case 1: {
      return <Step1 setUserData={setUserData} setOnboardingStep={setOnboardingStep} />;
    }
    case 2: {
      return (
        <Step2
          handleSaveUserData={handleSaveUserData}
        />
      );
    }
  }
};

function Onboarding() {
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingLoading, setOnboardingLoading] = useState(false);
const {userId, userAccessToken} = useSignIn()
const {setUserProfile} = useAppState()
  const [userData, setUserData] = useState<OnboardingUserData>({
    gender: null,
    age: null
  })

   const handleSaveUserData = (age: number) => {
    setOnboardingLoading(true)
    console.log('userData',userData, age);
if(userId && userAccessToken && userData.gender){
  addUserAccountInfo(userId, userAccessToken, userData.gender,age).then((data:UserProfileResponse['account'])=>{
    toast(`Set account success`, { type: 'success', hideProgressBar: true });
    setUserProfile((prev) => (prev ? { ...prev, account: data } : prev));
  }).catch(err=>{
    toast(`Set account error: ${err}`, { type: 'error', hideProgressBar: true });

  })
}

   }

if(onboardingLoading){
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
      {getStep(onboardingStep, setUserData, setOnboardingStep, handleSaveUserData)}
    </Box>
  );
}

export default Onboarding;
