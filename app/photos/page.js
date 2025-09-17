"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Paper, Button, CircularProgress, Modal } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';

const ImageCarousel = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('http://localhost:4000/api/images', {
        method: 'GET'
      });
      if (!res.ok) throw new Error('Failed to fetch images');
      const data = await res.json();
      const mapped = (Array.isArray(data) ? data : []).map((item) => ({
        id: item.id,
        src: item.url,
        alt: 'Uploaded image',
        title: item.created_at ? new Date(item.created_at).toLocaleString() : 'Uploaded image'
      }));
      setImages(mapped);
      setCurrentIndex(0);
    } catch (e) {
      setError(e.message || 'Error loading images');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Auto play removed

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // No auto play handlers

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      setIsUploading(true);
      setError(null);
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('http://localhost:4000/api/images', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error('Upload failed');
      await fetchImages();
    } catch (e) {
      setError(e.message || 'Error uploading image');
    } finally {
      setIsUploading(false);
      // reset input so the same file can be uploaded again if needed
      if (e.target) e.target.value = '';
    }
  };

  return (
    <Box style={{ 
      maxWidth: '900px', 
      margin: '40px auto', 
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '16px',
      overflowX: 'hidden'
    }}>
      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{
          margin: 0,
          color: '#333',
          fontSize: '28px',
          fontWeight: 'bold'
        }}>
          Image Gallery Carousel
        </h2>
        <Box>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Button variant="contained" onClick={handleUploadClick} disabled={isUploading}>
            {isUploading ? 'Uploading…' : 'Upload Image'}
          </Button>
        </Box>
      </Box>

      {error && (
        <Box style={{ color: '#b00020', marginBottom: '12px' }}>{error}</Box>
      )}
      {isLoading && images.length === 0 && (
        <Box style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <CircularProgress size={18} />
          <span>Loading images…</span>
        </Box>
      )}
      
      {/* Main Carousel Container */}
      <Box 
        style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Image Display */}
        <Paper
          style={{
            position: 'relative',
            height: '1000px',
            overflow: 'hidden',
            borderRadius: '12px'
          }}
        >
          {images.length > 0 ? (
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              onClick={() => setIsLightboxOpen(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'opacity 0.5s ease-in-out',
                cursor: 'zoom-in'
              }}
            />
          ) : (
            <Box style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#777'
            }}>
              {isLoading ? 'Loading…' : 'No images yet. Upload one to get started.'}
            </Box>
          )}
          
          {/* Image Title Overlay */}
          {images.length > 0 && (
            <Box
              style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
                color: 'white',
                padding: '40px 20px 20px 20px',
                textAlign: 'center'
              }}
            >
              <h3 style={{
                margin: '0',
                fontSize: '24px',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
              }}>
                {images[currentIndex].title}
              </h3>
            </Box>
          )}
        </Paper>

        {/* Previous Button */}
        <IconButton
          onClick={goToPrevious}
          style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#333',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              transform: 'translateY(-50%) scale(1.1)',
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)'
            }
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        {/* Next Button */}
        <IconButton
          onClick={goToNext}
          style={{
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#333',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              transform: 'translateY(-50%) scale(1.1)',
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)'
            }
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* Indicator Dots */}
      {images.length > 0 && (
        <Box
          style={{
            marginTop: '20px',
            textAlign: 'center',
            padding: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '25px',
            backdropFilter: 'blur(10px)'
          }}
        >
          {images.map((_, index) => (
            <IconButton
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                padding: '8px',
                margin: '0 4px',
                color: index === currentIndex 
                  ? '#1976d2' 
                  : 'rgba(0, 0, 0, 0.4)',
                transform: index === currentIndex ? 'scale(1.3)' : 'scale(1)',
                transition: 'all 0.3s ease'
              }}
            >
              <FiberManualRecordIcon style={{ fontSize: '12px' }} />
            </IconButton>
          ))}
        </Box>
      )}
      
      {/* Additional Info */}
      <Box style={{
        textAlign: 'center',
        marginTop: '20px',
        color: '#666',
        fontSize: '14px'
      }}>
        <p>👆 Click dots to navigate</p>
        <p>{images.length > 0 ? `Image ${currentIndex + 1} of ${images.length}` : 'No images loaded'}</p>
      </Box>

      {/* Main Menu Button */}
      <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <Button variant="outlined" onClick={() => router.push('/main')}>
          Main Menu
        </Button>
      </Box>

      {/* Lightbox Modal */}
      <Modal
        open={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        aria-labelledby="image-lightbox"
        aria-describedby="enlarged-image-view"
        BackdropProps={{
          style: { backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }
        }}
      >
        <Box
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '85vw',
            height: '50vh',
            backgroundColor: '#000',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            overflow: 'hidden'
          }}
        >
          <IconButton
            aria-label="Close"
            onClick={() => setIsLightboxOpen(false)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              zIndex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white'
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
            {images.length > 0 && (
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ImageCarousel;