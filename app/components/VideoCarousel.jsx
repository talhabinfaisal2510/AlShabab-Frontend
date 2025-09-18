"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Slider, Tooltip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const MEHRUN_COLOR = "#810c3c";

const VideoCarousel = ({ initialVideos = [] }) => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideTimerRef = useRef(null);

  const fetchVideos = async () => {
    try {
      setIsLoading(videos.length === 0);
      setError(null);
      const res = await fetch('/api/videos', { method: 'GET' });
      if (!res.ok) throw new Error('Failed to fetch videos');
      const data = await res.json();
      const mapped = (Array.isArray(data) ? data : []).map((item) => ({
        id: item.id,
        src: item.url,
        title: item.created_at ? new Date(item.created_at).toLocaleString() : 'Uploaded video'
      }));
      setVideos(mapped);
      setCurrentIndex(0);
    } catch (e) {
      setError(e.message || 'Error loading videos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Seed with initial videos immediately if provided
    if (Array.isArray(initialVideos) && initialVideos.length > 0) {
      const seeded = initialVideos.map((item) => ({
        id: item.id,
        src: item.url,
        title: item.created_at ? new Date(item.created_at).toLocaleString() : 'Uploaded video'
      }));
      setVideos(seeded);
      setCurrentIndex(0);
    }
    // Refresh in background without blocking paint
    fetchVideos();
  }, []);

  useEffect(() => {
    // Autoplay next when source changes
    if (videoRef.current) {
      // Attempt autoplay; may require muted for browsers
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      // show controls briefly on source change
      setShowControls(true);
      resetHideTimer();
    }
  }, [currentIndex]);

  const handleEnded = () => {
    if (videos.length === 0) return;
    const next = (currentIndex + 1) % videos.length;
    setCurrentIndex(next);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime || 0);
    // Do not reset hide timer here; autohide should depend on user inactivity, not playback progress
  };

  const togglePlay = async () => {
    if (!videoRef.current) return;
    try {
      if (videoRef.current.paused) {
        await videoRef.current.play();
        setIsPlaying(true);
        setShowControls(true);
        resetHideTimer();
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowControls(true); // keep controls visible when paused
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      }
    } catch {}
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleSeek = (_e, value) => {
    if (!videoRef.current) return;
    const newTime = Array.isArray(value) ? value[0] : value;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleFullscreen = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
  };

  const resetHideTimer = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    // only autohide when playing
    if (videoRef.current && !videoRef.current.paused) {
      hideTimerRef.current = setTimeout(() => setShowControls(false), 2000);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    resetHideTimer();
  };

  useEffect(() => () => hideTimerRef.current && clearTimeout(hideTimerRef.current), []);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      setIsUploading(true);
      setError(null);
      const formData = new FormData();
      formData.append('video', file);
      const res = await fetch('/api/videos', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      await fetchVideos();
    } catch (e) {
      setError(e.message || 'Error uploading video');
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  return (
    <Box style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '16px', overflowX: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#810c3c', fontSize: '48px', fontWeight: 'bold', letterSpacing: '1px' }}>Video Carousel</h2>
        <Box>
          <input ref={fileInputRef} type="file" accept="video/*" style={{ display: 'none' }} onChange={handleFileChange} />
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
              '&:hover': {
                backgroundColor: MEHRUN_COLOR,
              },
              '&.Mui-disabled': { color: 'white' },
              minWidth: '220px',
              minHeight: '64px',
              transition: 'all 0.2s',
            }}
          >
            <CloudUploadIcon sx={{ mr: 1.5, mb: 0.5, fontSize: 38 }} />
            {isUploading ? 'Uploading…' : 'Upload Video'}
          </Button>
        </Box>
      </Box>

      {error && (<Box style={{ color: '#b00020', marginBottom: '12px' }}>{error}</Box>)}
      {isLoading && videos.length === 0 && (
        <Box style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <CircularProgress size={18} />
          <span>Loading videos…</span>
        </Box>
      )}

      <Box onMouseMove={handleMouseMove} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)', flex: '1 1 auto', minHeight: 0 }}>
        {videos.length > 0 ? (
          <>
            <video
              key={videos[currentIndex].id}
              ref={videoRef}
              src={videos[currentIndex].src}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              autoPlay
              muted={isMuted}
              onEnded={handleEnded}
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => { setIsPlaying(true); setShowControls(true); resetHideTimer(); }}
              onPause={() => { setIsPlaying(false); setShowControls(true); if (hideTimerRef.current) clearTimeout(hideTimerRef.current); }}
            />

            {/* Custom controls bar */}
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0,0,0,0.35)',
                padding: '10px 14px',
                opacity: showControls ? 1 : 0,
                transition: 'opacity 200ms ease',
                pointerEvents: showControls ? 'auto' : 'none',
              }}
            >
              <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
                <IconButton onClick={togglePlay} size="large" sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.25)' }}>
                  {isPlaying ? <PauseIcon sx={{ fontSize: 50 }} /> : <PlayArrowIcon sx={{ fontSize: 50 }} />}
                </IconButton>
              </Tooltip>

              <Slider
                size="medium"
                value={Math.min(currentTime, duration)}
                min={0}
                max={Math.max(duration, 0.0001)}
                step={0.1}
                onChange={handleSeek}
                sx={{
                  color: MEHRUN_COLOR,
                  flex: 1,
                  '& .MuiSlider-thumb': { width: 20, height: 20 },
                  '& .MuiSlider-rail': { opacity: 0.3 },
                }}
              />

              <Tooltip title={isMuted ? 'Unmute' : 'Mute'}>
                <IconButton onClick={toggleMute} size="large" sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.25)' }}>
                  {isMuted ? <VolumeOffIcon sx={{ fontSize: 50 }} /> : <VolumeUpIcon sx={{ fontSize: 50 }} />}
                </IconButton>
              </Tooltip>

              <Tooltip title="Fullscreen">
                <IconButton onClick={handleFullscreen} size="large" sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.25)' }}>
                  <FullscreenIcon sx={{ fontSize: 50 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </>
        ) : (
          <Box style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#777' }}>{isLoading ? 'Loading…' : 'No videos yet. Upload one to get started.'}</Box>
        )}
      </Box>
    </Box>
  );
};

export default VideoCarousel;


