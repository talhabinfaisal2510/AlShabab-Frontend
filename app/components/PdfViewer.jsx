"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Tooltip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const MEHRUN_COLOR = "#810c3c";

const PdfViewer = () => {
  const [pdf, setPdf] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1.6);
  const fileInputRef = useRef(null);

  const fetchLatest = async () => {
    try {
      setIsLoading(!pdf);
      setError(null);
      const res = await fetch('/api/pdf', { method: 'GET' });
      if (!res.ok) throw new Error('Failed to fetch PDF');
      const data = await res.json();
      setPdf(data);
    } catch (e) {
      setError(e.message || 'Error loading PDF');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchLatest(); }, []);

  // Increase default zoom on smaller screens (mobile/tablet)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth || 0;
      if (w <= 480) setScale(2.0);
      else if (w <= 768) setScale(1.8);
      else setScale(3.6);
    }
  }, []);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      setIsUploading(true);
      setError(null);
      const formData = new FormData();
      formData.append('pdf', file);
      const res = await fetch('/api/pdf', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      await fetchLatest();
    } catch (e) {
      setError(e.message || 'Error uploading PDF');
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.4));
  const resetZoom = () => setScale(1);

  return (
    <Box style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '16px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: MEHRUN_COLOR, fontSize: '48px', fontWeight: 'bold', letterSpacing: '1px' }}>Brochure</h2>
        <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input ref={fileInputRef} type="file" accept="application/pdf" style={{ display: 'none' }} onChange={handleFileChange} />
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
              boxShadow: '0 6px 18px rgba(129,12,60,0.18)',
              letterSpacing: '1px',
              '&:hover': { backgroundColor: MEHRUN_COLOR },
              '&.Mui-disabled': { color: 'white' },
              minWidth: '220px',
              minHeight: '64px',
              transition: 'all 0.2s',
            }}
          >
            <CloudUploadIcon sx={{ mr: 1.5, mb: 0.5, fontSize: 38 }} />
            {isUploading ? 'Uploading…' : 'Upload PDF'}
          </Button>
          <Tooltip title="Zoom in"><span><IconButton onClick={zoomIn} sx={{ backgroundColor: 'rgba(0,0,0,0.08)' }}><ZoomInIcon /></IconButton></span></Tooltip>
          <Tooltip title="Zoom out"><span><IconButton onClick={zoomOut} sx={{ backgroundColor: 'rgba(0,0,0,0.08)' }}><ZoomOutIcon /></IconButton></span></Tooltip>
          <Tooltip title="Reset"><span><IconButton onClick={resetZoom} sx={{ backgroundColor: 'rgba(0,0,0,0.08)' }}><RestartAltIcon /></IconButton></span></Tooltip>
        </Box>
      </Box>

      {error && (<Box style={{ color: '#b00020', marginBottom: '12px' }}>{error}</Box>)}
      {isLoading && !pdf && (
        <Box style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <CircularProgress size={18} />
          <span>Loading brochure…</span>
        </Box>
      )}

      <Box style={{ position: 'relative', borderRadius: '12px', overflow: 'auto', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)', flex: '1 1 auto', minHeight: 0 }}>
        {pdf?.url ? (
          <Box sx={{ width: '100%', height: '100%', transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <iframe
              title="brochure"
              src={`${pdf.url}#zoom=${Math.round(scale * 100)}`}
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </Box>
        ) : (
          <Box style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#777' }}>
            {isLoading ? 'Loading…' : 'No brochure uploaded yet.'}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PdfViewer;


