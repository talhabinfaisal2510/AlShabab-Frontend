"use client";

import React from 'react';
import { Box, Modal } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MainMenuButton from './menuButton';

const MapModal = ({ open, onClose, mapUrl ="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093346!2d144.95373631531695!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f15.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1635749634842!5m2!1sen!2sau&z=16&output=embed&iwloc=&cid=" }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="location-modal"
      aria-describedby="location-map"
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
        {/* Location Badge - matching your existing style */}
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
            <LocationOnIcon sx={{ fontSize: '38px' }} />
            Location
          </Box>
        </Box>

        {/* Map Container - matching your existing modal structure */}
        <Box 
          sx={{ 
            width: '100%', 
            height: '100%', 
            overflow: 'hidden', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'stretch', 
            justifyContent: 'space-between',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
          }}
        >
          {/* Map iframe */}
          <Box sx={{ flex: '1 1 auto', minHeight: 0 }}>
            <iframe
              src={mapUrl}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '12px 12px 0 0'
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </Box>
          
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
  );
};

export default MapModal;