"use client";
import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import Login from './components/Login';
import NewsList from './components/NewsList';
import axios from 'axios';
import dummyNews from './dummyNews'; // 더미 뉴스 데이터

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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [news, setNews] = useState(dummyNews);
  const [token, setToken] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    const storedToken = localStorage.getItem('jwtToken');

    if (tokenFromUrl) {
      console.log("Token received from URL:", tokenFromUrl);
      localStorage.setItem('jwtToken', tokenFromUrl);
      setToken(tokenFromUrl);
      setIsLoggedIn(true);
      window.history.replaceState({}, document.title, window.location.pathname);
      fetchNews(tokenFromUrl);
    } else if (storedToken) {
      console.log("Token found in localStorage");
      setToken(storedToken);
      setIsLoggedIn(true);
      fetchNews(storedToken);
    } else {
      console.log("No token found");
      setIsLoggedIn(false);
    }
  };

  const fetchNews = async (token) => {
    try {
      const response = await axios.get('http://localhost:8070/api/news/yesterday', {
        headers: { Authorization: `Bearer ${token}` }
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

  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 'bold' }}>
                NEWSFLIX
              </Typography>
              {isLoggedIn && (
                  <Button color="inherit" onClick={handleLogout}>로그아웃</Button>
              )}
            </Toolbar>
          </AppBar>
          <Box sx={{ p: 3, position: 'relative' }}>
            <NewsList news={news} />
            {!isLoggedIn && <Login />}
          </Box>
        </Box>
      </ThemeProvider>
  );
}

export default App;
