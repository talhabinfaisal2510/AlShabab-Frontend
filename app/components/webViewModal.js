"use client";

import React from 'react';
import { Modal, Box } from '@mui/material';
import MainMenuButton from './menuButton';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const WebViewModal = ({ open, onClose, url, title = "Web View", icon = null }) => {
  return (
    <>
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={`${title.toLowerCase()}-modal`}
      aria-describedby={`${title.toLowerCase()}-content`}
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
          overflow: 'visible'
        }}
      >
        {/* Dynamic Badge */}
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
            {icon && React.cloneElement(icon, { sx: { fontSize: '38px' } })}
            {title}
          </Box>
        </Box>

        {/* Main Content Area - matches PdfViewer styling */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: '#f5f5f5',
            borderRadius: '16px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Box
            sx={{
              flex: '1 1 auto',
              minHeight: 0,
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
          >
           <iframe
              src={url}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
                transform: 'scale(1.5)',
                transformOrigin: 'center center'
              }}
              title={title}
            />
          </Box>

          {/* No footer button inside modal for Sign-Up */}
        </Box>
        {/* Separate Main Menu Button below the white modal (inside modal root so it stays above backdrop) */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 'calc(60vh + 32px)',
            zIndex: 10,
            backgroundColor: 'transparent'
          }}
        >
          <MainMenuButton onClose={onClose} />
        </Box>
      </Box>
    </Modal>
    </>
  );
};

export default WebViewModal;