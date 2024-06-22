import { Button, SxProps, Theme, useMediaQuery } from '@mui/material';

export enum ButtonType {
  WHITE = 'white',
  BLACK = 'black',
  RED = 'red',
  START = 'start',
  TRANSPARENT = 'transparent',
  RED_DISABLED = 'RED_DISABLED',
  APP = 'APP',
  APP_DISABLED = 'APP_DISABLED',
}

function QuizButton({
  text,
  variant,
  onClick,
  disabled,
  maxWidth,
  additionalStyles,
  type,
  children,
}: {
  text?: string;
  variant: ButtonType;
  onClick: () => void;
  disabled?: boolean;
  maxWidth?: string;
  additionalStyles?: SxProps<Theme>;
  type?: 'button' | 'submit' | 'reset';
  children?: JSX.Element;
}) {
  const isMobile = useMediaQuery('(max-width:600px)');

  const getOverrideButtonStyles = () => {
    switch (variant) {
      case ButtonType.WHITE: {
        return {
          backgroundColor: '#fff',
          color: '#01091C',
          '&:hover': {
            backgroundColor: '#fff',
            opacity: isMobile ? 1 : 0.8,
          },
        };
      }
      case ButtonType.START: {
        return {
          backgroundColor: '#E1413E',
          color: '#fff',
          fontFamily: 'sfpro600',
          maxWidth: maxWidth,
          '&:hover': {
            backgroundColor: '#E1413E',
            opacity: isMobile ? 1 : 0.8,
          },
        };
      }
      case ButtonType.BLACK: {
        return {
          backgroundColor: '#18182E',
          color: '#fff',
          fontFamily: 'sfpro700',
          '&:hover': {
            backgroundColor: '#18182E',
            opacity: isMobile ? 1 : 0.8,
          },
        };
      }
      case ButtonType.RED: {
        return {
          backgroundColor: '#E1413E',
          color: '#fff',
          fontFamily: 'sfpro700',
          '&:hover': {
            backgroundColor: '#E1413E',
            opacity: isMobile ? 1 : 0.8,
          },
          '&:disabled': {
            backgroundColor: '#18182E',
            color: '#717889',
          },
        };
      }
      case ButtonType.RED_DISABLED: {
        return {
          backgroundColor: '#18182E',
          color: '#fff',
          fontFamily: 'sfpro700',
          '&:hover': {
            backgroundColor: '#18182E',
            opacity: isMobile ? 1 : 0.8,
          },
          '&:disabled': {
            backgroundColor: '#18182E',
            color: '#717889',
          },
        };
      }
      case ButtonType.APP: {
        return {
          background: 'linear-gradient(180deg, #6558FD 0%, #7951CE 100%)',
          color: '#fff',
          fontFamily: 'sfpro700',
          '&:hover': {
            backgroundColor: '#E1413E',
            opacity: isMobile ? 1 : 0.8,
          },
          '&:disabled': {
            backgroundColor: '#18182E',
            color: '#717889',
          },
        };
      }
      case ButtonType.APP_DISABLED: {
        return {
          background: 'linear-gradient(180deg, #6558FD 0%, #7951CE 100%)',
          opacity: 0.5,
          color: '#fff',
          fontFamily: 'sfpro700',
          '&:hover': {
            backgroundColor: '#18182E',
            opacity: isMobile ? 1 : 0.8,
          },
          '&:disabled': {
            backgroundColor: '#18182E',
            color: '#717889',
          },
        };
      }
      case ButtonType.TRANSPARENT: {
        return {
          backgroundColor: 'transparent',
          color: '#fff',
          fontFamily: 'sfpro700',
          '&:hover': {
            backgroundColor: 'transparent',
            opacity: isMobile ? 1 : 0.8,
          },
        };
      }
    }
  };

  return (
    <Button
      disabled={disabled}
      fullWidth
      type={type}
      sx={{
        fontFamily: 'sfpro700',
        fontSize: '20px',
        textTransform: 'none',
        height: '66px',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        ...getOverrideButtonStyles(),
        ...(additionalStyles ?? {}),
      }}
      onClick={onClick}
    >
      {text}
      {children}
    </Button>
  );
}

export default QuizButton;
