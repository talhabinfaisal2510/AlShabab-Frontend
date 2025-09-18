"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Modal } from '@mui/material';
import dynamic from 'next/dynamic';
const DynamicImageCarousel = dynamic(() => import('../components/ImageCarousel'), { ssr: false });
const DynamicVideoCarousel = dynamic(() => import('../components/VideoCarousel'), { ssr: false });
const DynamicPdfViewer = dynamic(() => import('../components/PdfViewer'), { ssr: false });
import MainMenuButton from '../components/menuButton';
import PhotoCameraIcon from '@mui/icons-material/CameraAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const MainMenuPage = () => {
  const [isPhotosOpen, setIsPhotosOpen] = useState(false);
  const [isVideosOpen, setIsVideosOpen] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [prefetchedImages, setPrefetchedImages] = useState([]);
  const [prefetchedVideos, setPrefetchedVideos] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const prefetch = async () => {
      try {
        const res = await fetch('/api/images', { method: 'GET' });
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && Array.isArray(data)) setPrefetchedImages(data);
      } catch {
        // ignore prefetch errors
      }
    };
    prefetch();
    const prefetchVideos = async () => {
      try {
        const res = await fetch('/api/videos', { method: 'GET' });
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && Array.isArray(data)) setPrefetchedVideos(data);
      } catch {
        // ignore
      }
    };
    prefetchVideos();
    return () => { isMounted = false; };
  }, []);

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
      openModal: () => setIsPhotosOpen(true),
    },
    {
      id: 'brochure',
      icon: <MenuBookIcon sx={{ fontSize: '140px', color: 'white' }} />,
      label: 'Brochure',
      onClick: () => handleButtonClick('Brochure'),
      openModal: () => setIsPdfOpen(true),
    },
    {
      id: 'video',
      icon: <YouTubeIcon sx={{ fontSize: '120px', color: 'white' }} />,
      label: 'Video',
      onClick: () => handleButtonClick('Video'),
      openModal: () => setIsVideosOpen(true),
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
              onClick={menuButtons[0].openModal}
              sx={{
                width: '320px',
                height: '320px',
                background: 'linear-gradient(180deg, #3e3e3e 0%, #0f0f0f 100%)',
                border: '2px solid rgba(255,255,255,0.75)',
                borderRadius: '50%',
                position: 'relative',
                overflow: 'visible',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: '0 18px 40px rgba(0,0,0,0.45), inset 0 4px 10px rgba(255,255,255,0.08)',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100%',
                  height: '36px',
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)',
                  filter: 'blur(10px)',
                  pointerEvents: 'none'
                },
                '&:hover': {
                  background: 'linear-gradient(180deg, #4a4a4a 0%, #141414 100%)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 22px 50px rgba(0,0,0,0.55), inset 0 6px 12px rgba(255,255,255,0.1)',
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
              onClick={menuButtons[1].openModal}
              sx={{
                width: '380px',
                height: '380px',
                background: 'linear-gradient(180deg, #3e3e3e 0%, #0f0f0f 100%)',
                border: '2px solid rgba(255,255,255,0.75)',
                borderRadius: '50%',
                position: 'relative',
                overflow: 'visible',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 18px 40px rgba(0,0,0,0.45), inset 0 4px 10px rgba(255,255,255,0.08)',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100%',
                  height: '36px',
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)',
                  filter: 'blur(10px)',
                  pointerEvents: 'none'
                },
                '&:hover': {
                  background: 'linear-gradient(180deg, #4a4a4a 0%, #141414 100%)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 22px 50px rgba(0,0,0,0.55), inset 0 6px 12px rgba(255,255,255,0.1)',
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
              onClick={menuButtons[2].openModal}
              sx={{
                width: '320px',
                height: '320px',
                background: 'linear-gradient(180deg, #3e3e3e 0%, #0f0f0f 100%)',
                border: '2px solid rgba(255,255,255,0.75)',
                borderRadius: '50%',
                position: 'relative',
                overflow: 'visible',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: '0 18px 40px rgba(0,0,0,0.45), inset 0 4px 10px rgba(255,255,255,0.08)',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100%',
                  height: '36px',
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)',
                  filter: 'blur(10px)',
                  pointerEvents: 'none'
                },
                '&:hover': {
                  background: 'linear-gradient(180deg, #4a4a4a 0%, #141414 100%)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 22px 50px rgba(0,0,0,0.55), inset 0 6px 12px rgba(255,255,255,0.1)',
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
                background: 'linear-gradient(180deg, #3e3e3e 0%, #0f0f0f 100%)',
                border: '2px solid rgba(255,255,255,0.75)',
                borderRadius: '50%',
                position: 'relative',
                overflow: 'visible',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: '0 18px 40px rgba(0,0,0,0.45), inset 0 4px 10px rgba(255,255,255,0.08)',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100%',
                  height: '36px',
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)',
                  filter: 'blur(10px)',
                  pointerEvents: 'none'
                },
                '&:hover': {
                  background: 'linear-gradient(180deg, #4a4a4a 0%, #141414 100%)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 22px 50px rgba(0,0,0,0.55), inset 0 6px 12px rgba(255,255,255,0.1)',
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
                background: 'linear-gradient(180deg, #3e3e3e 0%, #0f0f0f 100%)',
                border: '2px solid rgba(255,255,255,0.75)',
                borderRadius: '50%',
                position: 'relative',
                overflow: 'visible',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: '0 18px 40px rgba(0,0,0,0.45), inset 0 4px 10px rgba(255,255,255,0.08)',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100%',
                  height: '36px',
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)',
                  filter: 'blur(10px)',
                  pointerEvents: 'none'
                },
                '&:hover': {
                  background: 'linear-gradient(180deg, #4a4a4a 0%, #141414 100%)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 22px 50px rgba(0,0,0,0.55), inset 0 6px 12px rgba(255,255,255,0.1)',
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

      {/* Photos Modal - reuse the Photos page inside a modal via iframe to avoid code duplication */}
      <Modal
        open={isPhotosOpen}
        onClose={() => setIsPhotosOpen(false)}
        aria-labelledby="photos-modal"
        aria-describedby="photos-gallery"
        BackdropProps={{
          style: { backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(2px)' }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '85vw',
            height: '60vh',
          }}
        >
          {/* Photos Badge */}
          <Box
            sx={{
              position: 'absolute',
              top: '-60px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: '#810c3c',
                color: 'white',
                padding: '14px 48px',
                borderRadius: '25px',
                fontSize: '24px',
                fontWeight: 'bold',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 12px rgba(139, 30, 69, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                minWidth: '320px',
                justifyContent: 'center',
                position: 'relative',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: '8px solid #810c3c',
                }
              }}
            >
              <PhotoCameraIcon sx={{ fontSize: '36px' }} />
              Photos
            </Box>
          </Box>

          <Box sx={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between' }}>
            <Box sx={{ flex: '1 1 auto', minHeight: 0 }}>
              <DynamicImageCarousel initialImages={prefetchedImages} />
            </Box>
            <Box sx={{ flex: '0 0 auto', background: 'transparent' }}>
              <MainMenuButton onClose={() => setIsPhotosOpen(false)} />
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Videos Modal */}
      <Modal
        open={isVideosOpen}
        onClose={() => setIsVideosOpen(false)}
        aria-labelledby="videos-modal"
        aria-describedby="videos-gallery"
        BackdropProps={{
          style: { backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(2px)' }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '85vw',
            height: '60vh',
          }}
        >
          {/* Videos Badge */}
          <Box
            sx={{
              position: 'absolute',
              top: '-60px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: '#810c3c',
                color: 'white',
                padding: '14px 48px',
                borderRadius: '25px',
                fontSize: '24px',
                fontWeight: 'bold',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 12px rgba(129, 12, 60, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                minWidth: '320px',
                justifyContent: 'center',
                position: 'relative',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: '8px solid #810c3c',
                }
              }}
            >
              <YouTubeIcon sx={{ fontSize: '38px' }} />
              Video
            </Box>
          </Box>

          <Box sx={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between' }}>
            <Box sx={{ flex: '1 1 auto', minHeight: 0 }}>
              <DynamicVideoCarousel initialVideos={prefetchedVideos} />
            </Box>
            <Box sx={{ flex: '0 0 auto', background: 'transparent' }}>
              <MainMenuButton onClose={() => setIsVideosOpen(false)} />
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Brochure (PDF) Modal */}
      <Modal
        open={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        aria-labelledby="pdf-modal"
        aria-describedby="brochure-pdf"
        BackdropProps={{
          style: { backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(2px)' }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '85vw',
            height: '60vh',
            overflow: 'hidden'
          }}
        >
          {/* PDF Badge */}
          <Box
            sx={{
              position: 'absolute',
              top: '-60px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: '#810c3c',
                color: 'white',
                padding: '14px 48px',
                borderRadius: '25px',
                fontSize: '24px',
                fontWeight: 'bold',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 12px rgba(129, 12, 60, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                minWidth: '320px',
                justifyContent: 'center',
                position: 'relative',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: '8px solid #810c3c',
                }
              }}
            >
              Brochure
            </Box>
          </Box>

          <Box sx={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between' }}>
            <Box sx={{ flex: '1 1 auto', minHeight: 0 }}>
              <DynamicPdfViewer />
            </Box>
            <Box sx={{ flex: '0 0 auto', background: 'transparent' }}>
              <MainMenuButton onClose={() => setIsPdfOpen(false)} />
            </Box>
          </Box>
        </Box>
      </Modal>

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