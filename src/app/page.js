"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, AppBar, Toolbar, Typography, Button, ToggleButtonGroup, ToggleButton, Dialog, DialogContent, CircularProgress } from '@mui/material';
import Login from './components/Login';
import NewsList from './components/NewsList';
import axios from 'axios';
import dummyNews from './dummyNews';
import NewsTimeline from "./components/NewsTimeline";
import { useSearchParams } from 'next/navigation';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#141414',
      paper: '#141414',
    },
    primary: {
      main: '#E50914',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  },
});

const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [news, setNews] = useState(dummyNews);
  const [token, setToken] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [selectedView, setSelectedView] = useState('list');
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [confirmationStatus, setConfirmationStatus] = useState('pending');
  const searchParams = useSearchParams();
  const confirmationAttempted = useRef(false);

  useEffect(() => {
    checkLoginStatus();
  }, []); // Only run on initial mount

  useEffect(() => {
    if (token) {
      checkPaymentStatus();
      checkMembershipStatus(token);
    }
  }, [token]); // Run when the token changes

  const checkLoginStatus = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    const storedToken = localStorage.getItem('jwtToken');

    if (tokenFromUrl) {
      localStorage.setItem('jwtToken', tokenFromUrl);
      setToken(tokenFromUrl);
      setIsLoggedIn(true);
      window.history.replaceState({}, document.title, window.location.pathname);
      fetchNews(tokenFromUrl);
    } else if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      fetchNews(storedToken);
    } else {
      setIsLoggedIn(false);
    }
  };

  const checkPaymentStatus = async () => {
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    if (paymentKey && orderId && amount && !confirmationAttempted.current) {
      setOpenSuccessDialog(true);
      setConfirmationStatus('pending');
      setPaymentDetails({ paymentKey, orderId, amount });

      confirmationAttempted.current = true;
      try {
        const response = await axios.post(`${gatewayUrl}/api/payments/confirm`, {
          paymentKey,
          orderId,
          amount: Number(amount),
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          setConfirmationStatus('success');
        } else {
          setConfirmationStatus('failed');
        }
      } catch (error) {
        console.error("Error confirming payment:", error);
        setConfirmationStatus('error');
      }

      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  const checkMembershipStatus = async (token) => {
    console.log("token", token);
    try {
      const response = await axios.get(`http://localhost:8070/api/membership/check?userId=1`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsMember(response.data);
    } catch (error) {
      console.error("Error checking membership status:", error);
    }
  };

  const fetchNews = async (token) => {
    try {
      const response = await axios.get('http://localhost:8070/api/news/yesterday', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNews(response.data);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setToken(null);
    setIsLoggedIn(false);
    setNews(dummyNews);
  };

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setSelectedView(newView);
    }
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    setConfirmationStatus('pending');
    setPaymentDetails(null);
    confirmationAttempted.current = false;
  };

  const dialogContent = () => {
    switch (confirmationStatus) {
      case 'pending':
        return (
            <Box display="flex" alignItems="center" justifyContent="center">
              <CircularProgress />
              <Typography variant="body1" sx={{ ml: 2 }}>결제 확인 중...</Typography>
            </Box>
        );
      case 'success':
        return (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                결제 성공! 🎉
              </Typography>
              <Typography variant="body1" paragraph>
                AI 요약의 세계로 오신 것을 환영합니다!
              </Typography>
              <Typography variant="body2" paragraph sx={{ fontStyle: 'italic' }}>
                이제 뉴스를 더 스마트하게 소비하실 수 있습니다.
              </Typography>
              <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2">주문 ID: {paymentDetails?.orderId}</Typography>
                <Typography variant="body2">결제 금액: {paymentDetails?.amount}원</Typography>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                AI 요약, 어떤 점이 특별할까요?
              </Typography>
              <Typography variant="body2" paragraph>
                클릭 한 번으로 뉴스의 핵심을 파악하세요!
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleCloseSuccessDialog}>
                AI 요약 시작하기
              </Button>
            </Box>
        );
      case 'failed':
      case 'error':
        return (
            <>
              <Typography variant="body1">결제 확인 실패.</Typography>
              <Button color="primary" onClick={() => window.location.href = '/payment/fail'}>
                실패 페이지로 이동
              </Button>
            </>
        );
    }
  };

  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 'bold' }}>
                {/* Title or Logo */}
              </Typography>
              {isLoggedIn && (
                  <>
                    <ToggleButtonGroup
                        value={selectedView}
                        exclusive
                        onChange={handleViewChange}
                        aria-label="view selection"
                        sx={{ ml: 2 }}
                    >
                      <ToggleButton value="list" aria-label="list view">
                        리스트
                      </ToggleButton>
                      <ToggleButton value="timeline" aria-label="timeline view">
                        타임라인
                      </ToggleButton>
                    </ToggleButtonGroup>
                    <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>로그아웃</Button>
                  </>
              )}
              {!isMember && isLoggedIn && (
                  <Button onClick={() => window.location.href = '/payment/method'}>
                    멤버십 결제하기
                  </Button>
              )}
            </Toolbar>
          </AppBar>
          <Box sx={{ p: 3, position: 'relative' }}>
            {isLoggedIn ? (
                selectedView === 'list' ? (
                    <NewsList news={news} isMember={isMember} />
                ) : (
                    <NewsTimeline news={news} isMember={isMember} />
                )
            ) : (
                <>
                  <NewsList news={dummyNews} />
                  <Login />
                </>
            )}
          </Box>
          <Dialog open={openSuccessDialog} onClose={handleCloseSuccessDialog}>
            <DialogContent>
              {dialogContent()}
            </DialogContent>
          </Dialog>
        </Box>
      </ThemeProvider>
  );
}

export default App;
