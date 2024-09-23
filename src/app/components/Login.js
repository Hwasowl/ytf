import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, keyframes } from '@mui/material';
import { styled } from '@mui/system';
import GoogleIcon from '@mui/icons-material/Google';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
`;

const pulse = keyframes`
    from { transform: scale3d(1, 1, 1); }
    50% { transform: scale3d(1.05, 1.05, 1.05); }
    to { transform: scale3d(1, 1, 1); }
`;

const zoomOutUp = keyframes`
  from {
    opacity: 1;
    transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
  }
  40% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
  }
  to {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);
    transform-origin: center bottom;
  }
`;

const FullScreenContainer = styled(Box)({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
});

const LogoContainer = styled(Box)(({ fadeOut, visible }) => ({
    opacity: visible ? 1 : 0,
    animation: fadeOut
        ? `${zoomOutUp} 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards`
        : `${fadeIn} 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards, ${pulse} 1s 1s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955)`,
    transition: 'opacity 0.1s ease-in',
}));

const LoginBox = styled(Box)({
    backgroundColor: 'rgba(20, 20, 20, 0.8)',
    padding: '40px',
    borderRadius: '8px',
    width: '475px',
    textAlign: 'center',
    animation: `${fadeIn} 1s ease-in`,
});

const GoogleButton = styled('button')({
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    border: '1px solid #dadce0',
    borderRadius: '4px',
    color: '#3c4043',
    cursor: 'pointer',
    fontFamily: 'Roboto, arial, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    height: '40px',
    letterSpacing: '0.25px',
    padding: '0 12px',
    position: 'relative',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: 'auto',
    '&:hover': {
        boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
        backgroundColor: '#f7f8f8',
    },
    '&:focus': {
        outline: 'none',
        border: '2px solid #4285f4',
    },
});

const GoogleLogo = styled('img')({
    height: '18px',
    width: '18px',
    marginRight: '8px',
});

const EnhancedLogin = () => {
    const [showLogo, setShowLogo] = useState(true);
    const [logoVisible, setLogoVisible] = useState(false);
    const [fadeOutLogo, setFadeOutLogo] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        const initialDelay = setTimeout(() => {
            setLogoVisible(true);
        }, 100);

        const logoTimer = setTimeout(() => {
            setFadeOutLogo(true);
            setTimeout(() => {
                setShowLogo(false);
                setShowLogin(true);
            }, 600);
        }, 1500);

        return () => {
            clearTimeout(initialDelay);
            clearTimeout(logoTimer);
        };
    }, []);

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <FullScreenContainer>
            {showLogo && (
                <LogoContainer fadeOut={fadeOutLogo} visible={logoVisible}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="56" viewBox="0 0 171 80" width="120">
                        <g fill="#E50914" fillRule="evenodd">
                            <path d="M147.1963 0L43.3735 80h24.5472l87.6746-67.5583.0698 55.107-25.9961-19.948-12.2584 9.4584L147.1963 80h23.4061V0h-23.4061M23.4061 80L127.229 0h-24.5472L15.007 67.5583l-.0698-55.107 25.9955 19.948 12.259-9.4584L23.4061 0H0v80h23.4061" />
                        </g>
                    </svg>
                </LogoContainer>
            )}
            {showLogin && (
                <LoginBox>
                    <Typography variant="h4" component="h2" sx={{ mb: 4, color: 'primary.main', fontWeight: 'bold' }}>
                        어제의 뉴스, 오늘의 인사이트
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, color: 'white' }}>
                        하루의 시작을 똑똑하게, 어제의 뉴스로 오늘을 준비하세요.
                    </Typography>
                    <GoogleButton onClick={handleGoogleLogin}>
                        <GoogleLogo src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" />
                        Google 계정으로 로그인
                    </GoogleButton>
                </LoginBox>
            )}
        </FullScreenContainer>
    );
};

export default EnhancedLogin;
