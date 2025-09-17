"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
// Removed hand icon since interactive text is removed

const CoverPage = () => {
  const router = useRouter();
  
  const handlePageClick = () => {
    router.push('/main');
  };

  return (
    <Box
      onClick={handlePageClick}
      sx={{
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '60px 40px 0 40px',
        zIndex: 1,
      }}
    >
      {/* Background video */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -2,
        }}
      >
        <source src="/Cover Shabab.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </Box>

      {/* White transparent overlay to improve text contrast */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
      {/* Logo at the top */}
      <Box
        sx={{
          marginTop: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/Al Shabab Logo.png"
          alt="Al Shabab Logo"
          sx={{
            maxWidth: '800px',
            maxHeight: '500px',
            objectFit: 'contain',
          }}
        />
      </Box>

      {/* Center content area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: '0px',
        }}
      >
        {/* Tap Here Button */}
        <Button
          onClick={handlePageClick}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            background: '#A73366',
            borderBottom: '20px solid #6B1E42',
            color: 'white',
            fontSize: '92px',
            fontFamily: 'Arial, sans-serif',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            borderRadius: '40px',
            padding: '24px 80px',
            minWidth: '400px',
            height: '200px',
            boxShadow: '0 8px 16px rgba(139, 46, 92, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: '#B73D72',
              borderBottom: '22px solid #7A2449',
              boxShadow: '0 12px 24px rgba(139, 46, 92, 0.4)',
              transform: 'translateY(-2px)'
            },
            '&:active': {
              transform: 'translateY(0px)',
              boxShadow: '0 4px 8px rgba(139, 46, 92, 0.3)',
              borderBottom: '18px solid #6B1E42'
            }
          }}
        >
          TAP HERE
        </Button>

        {/* Finger GIF */}
        <Box
          component="img"
          src="/FingerGif.gif"
          alt="Tap indicator"
          sx={{
            width: '940px',
            height: '440px',
            objectFit: 'contain',
            marginTop: '20px',
          }}
        />
      </Box>

      {/* Company Branding Box at bottom */
      }
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100vw',
          height: '140px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          borderTop: '2px solid rgba(255, 255, 255, 0.1)',
          zIndex: 10,
        }}
      >
        <Box
          component="img"
          src="/WWDS Logo.png"
          alt="WWDS Logo"
          sx={{
            maxHeight: '100%',
            maxWidth: '60%',
            objectFit: 'contain',
            padding: '10px 0'
          }}
        />
      </Box>
    </Box>
  );
};

export default CoverPage;