"use client";

import React from 'react';
import {
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const MainMenuPage = () => {
  const handleButtonClick = (buttonName) => {
    console.log(`${buttonName} button clicked`);
    // Add navigation logic here
  };

  const menuButtons = [
    {
      id: 'photos',
      icon: <PhotoCameraIcon sx={{ fontSize: '120px', color: 'white' }} />,
      label: 'Photos',
      onClick: () => handleButtonClick('Photos'),
    },
    {
      id: 'brochure',
      icon: <MenuBookIcon sx={{ fontSize: '140px', color: 'white' }} />,
      label: 'Brochure',
      onClick: () => handleButtonClick('Brochure'),
    },
    {
      id: 'video',
      icon: <PlayArrowIcon sx={{ fontSize: '120px', color: 'white' }} />,
      label: 'Video',
      onClick: () => handleButtonClick('Video'),
    },
    {
      id: 'location',
      icon: <LocationOnIcon sx={{ fontSize: '120px', color: 'white' }} />,
      label: 'Location',
      onClick: () => handleButtonClick('Location'),
    },
    {
      id: 'signup',
      icon: <HowToRegIcon sx={{ fontSize: '120px', color: 'white' }} />,
      label: 'Sign-Up',
      onClick: () => handleButtonClick('Sign-Up'),
    },
  ];

  return (
    <Box
      sx={{
        width: '1080px',
        height: '1920px',
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
        // Background video will be rendered as a separate element
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '40px 60px 0 60px',
        zIndex: 1,
      }}
    >
      {/* Background Video */}
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
          zIndex: -1,
        }}
      >
        <source src="/menuBG1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </Box>
      {/* Video at the top */}
      <Box
        sx={{
          marginTop: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: '800px',
        }}
      >
        <Box
          component="video"
          controls
          autoPlay
          muted
          loop
          sx={{
            width: '100%',
            maxWidth: '700px',
            height: 'auto',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          }}
        >
          <source src="/menuLogo1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </Box>
      </Box>

      {/* Menu Buttons Container */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Buttons arranged as in the image */}
        <Box
          sx={{
            position: 'relative',
            maxWidth: '800px',
            height: '700px',
          }}
        >
          {/* Photos - Top Right */}
          <Box
            sx={{
              position: 'absolute',
              top: '-210px',
              right: '0px',
            }}
          >
            <IconButton
              onClick={menuButtons[0].onClick}
              sx={{
                width: '320px',
                height: '320px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                border: '3px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {menuButtons[0].icon}
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '48px',
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                {menuButtons[0].label}
              </Typography>
            </IconButton>
          </Box>

          {/* Brochure - Top Left */}
          <Box
            sx={{
              position: 'absolute',
              top: '-67px',
              left: '46px',
            }}
          >
            <IconButton
              onClick={menuButtons[1].onClick}
              sx={{
                width: '380px',
                height: '380px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                border: '3px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {menuButtons[1].icon}
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '52px',
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                {menuButtons[1].label}
              </Typography>
            </IconButton>
          </Box>

          {/* Video - Middle Right */}
          <Box
            sx={{
              position: 'absolute',
              top: '153px',
              right: '92px',
            }}
          >
            <IconButton
              onClick={menuButtons[2].onClick}
              sx={{
                width: '320px',
                height: '320px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                border: '3px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {menuButtons[2].icon}
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '48px',
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                {menuButtons[2].label}
              </Typography>
            </IconButton>
          </Box>

          {/* Location - Middle Left */}
          <Box
            sx={{
              position: 'absolute',
              top: '361px',
              left: '56px',
            }}
          >
            <IconButton
              onClick={menuButtons[3].onClick}
              sx={{
                width: '320px',
                height: '320px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                border: '3px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {menuButtons[3].icon}
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '48px',
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                {menuButtons[3].label}
              </Typography>
            </IconButton>
          </Box>

          {/* Sign-Up - Bottom Center */}
          <Box
            sx={{
              position: 'absolute',
              top: '81%',
              left: '-311px',
            }}
          >
            <IconButton
              onClick={menuButtons[4].onClick}
              sx={{
                width: '320px',
                height: '320px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                border: '3px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  transform: 'translateX(-50%) scale(1.05)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {menuButtons[4].icon}
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '48px',
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                {menuButtons[4].label}
              </Typography>
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Company Branding Box at bottom (match cover page) */}
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

export default MainMenuPage;