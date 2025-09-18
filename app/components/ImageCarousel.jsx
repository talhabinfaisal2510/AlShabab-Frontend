"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Paper, Button, CircularProgress } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const MEHRUN_COLOR = "#810c3c";

const ImageCarousel = ({ initialImages = [] }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  // Lightbox disabled per latest requirements
  // const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const fetchImages = async () => {
    try {
      // Only show loading if we don't already have images to show
      setIsLoading((prev) => images.length === 0 ? true : prev);
      setError(null);
      const res = await fetch('/api/images', { method: 'GET' });
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
    // Seed with initial images immediately if provided
    if (Array.isArray(initialImages) && initialImages.length > 0) {
      const seeded = initialImages.map((item) => ({
        id: item.id,
        src: item.url,
        alt: 'Uploaded image',
        title: item.created_at ? new Date(item.created_at).toLocaleString() : 'Uploaded image'
      }));
      setImages(seeded);
      setCurrentIndex(0);
    }

    // Refresh in background without clearing currently shown images
    fetchImages();
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };
  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };
  const goToSlide = (index) => setCurrentIndex(index);

  const handleUploadClick = () => fileInputRef.current?.click();
  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      setIsUploading(true);
      setError(null);
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/images', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      await fetchImages();
    } catch (e) {
      setError(e.message || 'Error uploading image');
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  return (
    <Box style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '16px', overflowX: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        {/* 1. Increase font size of the "Image Gallery Carousel" */}
        <h2 style={{ margin: 0, color: '#810c3c', fontSize: '48px', fontWeight: 'bold', letterSpacing: '1px' }}>Image Carousel</h2>
        <Box>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
          {/* 2. Make the upload image button color mehrun, increase size and font size */}
          <Button
            variant="contained"
            onClick={handleUploadClick}
            disabled={isUploading}
            sx={{
              backgroundColor: MEHRUN_COLOR,
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              padding: '18px 40px',
              borderRadius: '32px',
              boxShadow: '0 6px 18px rgba(167,51,102,0.18)',
              letterSpacing: '1px',
              '&:hover': {
                backgroundColor: '#810c3c',
              },
              minWidth: '220px',
              minHeight: '64px',
              transition: 'all 0.2s',
              '&.Mui-disabled': {
                color: 'white',
              },
            }}
          >
            <CloudUploadIcon sx={{ mr: 1.5,mb:0.5, fontSize: 38 }} />
            {isUploading ? 'Uploading…' : 'Upload Image'}
          </Button>
        </Box>
      </Box>

      {error && (<Box style={{ color: '#b00020', marginBottom: '12px' }}>{error}</Box>)}
      {isLoading && images.length === 0 && (
        <Box style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <CircularProgress size={18} />
          <span>Loading images…</span>
        </Box>
      )}

      <Box style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)', flex: '1 1 auto', minHeight: 0 }}>
        <Paper style={{ position: 'relative', height: '100%', overflow: 'hidden', borderRadius: '12px' }}>
          {images.length > 0 ? (
            <img src={images[currentIndex].src} alt={images[currentIndex].alt} loading="eager" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'opacity 0.5s ease-in-out' }} />
          ) : (
            <Box style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#777' }}>{isLoading ? 'Loading…' : 'No images yet. Upload one to get started.'}</Box>
          )}

          {/* Removed bottom caption overlay per requirement */}
        </Paper>

        <IconButton onClick={goToPrevious} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', backgroundColor: '#810c3c', color: 'white', borderRadius: '50%', width: '70px', height: '70px', boxShadow: '0 4px 12px rgba(129, 12, 60, 0.3)', transition: 'all 0.3s ease' }}>
          <ArrowBackIosIcon sx={{ fontSize: '38px' }} />
        </IconButton>
        <IconButton onClick={goToNext} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', backgroundColor: '#810c3c', color: 'white', borderRadius: '50%', width: '70px', height: '70px', boxShadow: '0 4px 12px rgba(129, 12, 60, 0.3)', transition: 'all 0.3s ease' }}>
          <ArrowForwardIosIcon sx={{ fontSize: '38px' }} />
        </IconButton>
      </Box>

      {images.length > 0 && (
        <Box style={{ marginTop: '20px', textAlign: 'center', padding: '12px', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '25px', backdropFilter: 'blur(10px)' }}>
          {images.map((_, index) => (
            <IconButton
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                padding: '10px',
                margin: '0 6px',
                color: index === currentIndex ? '#810c3c' : 'rgba(0, 0, 0, 0.4)',
                transform: index === currentIndex ? 'scale(1.5)' : 'scale(1.1)',
                transition: 'all 0.2s ease'
              }}
            >
              <FiberManualRecordIcon style={{ fontSize: '38px' }} />
            </IconButton>
          ))}
        </Box>
      )}

      {/* Lightbox completely removed */}
    </Box>
  );
};

export default ImageCarousel;
