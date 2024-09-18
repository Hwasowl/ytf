// components/Login.js
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import GoogleIcon from '@mui/icons-material/Google';

const BlurOverlay = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
});

const LoginBox = styled(Box)({
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: '60px',
    borderRadius: '4px',
    width: '450px',
    textAlign: 'center',
});

const Login = () => {
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <BlurOverlay>
            <LoginBox>
                <Typography variant="h4" component="h1" sx={{ mb: 4, color: 'primary.main', fontWeight: 'bold' }}>
                    어제 있었던 시사 뉴스를 한눈에 보고 싶다면?
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleLogin}
                    sx={{ mt: 2 }}
                >
                    Google로 로그인
                </Button>
            </LoginBox>
        </BlurOverlay>
    );
};

export default Login;
