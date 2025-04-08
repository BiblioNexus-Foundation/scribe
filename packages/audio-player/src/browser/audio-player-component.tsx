import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, StopCircle, Rewind, FastForward } from 'lucide-react';
import metadata from './metadata.json';
import React, { useState, useEffect, useRef } from 'react';

const AudioPlayerComponent: React.FC = () => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const [selectedVerse, setSelectedVerse] = useState<number>(() => {
    return parseInt(localStorage.getItem('lastPlayedVerse') || '1', 10);
  });

  // Get total verses from metadata
  const TOTAL_VERSES = 10; // You can replace this with a dynamic value from your metadata

  // Get available verses from metadata
  const availableVerses = Array.from(
    { length: TOTAL_VERSES },
    (_, i) => i + 1
  ).filter((verse) =>
    Object.keys(metadata.ingredients).some((key) =>
      key.includes(`/1/${verse}.wav`)
    )
  );

  const audioFile = Object.keys(metadata.ingredients).find((key) =>
    key.includes(`/1/${selectedVerse}.wav`)
  );

  useEffect(() => {
    if (waveformRef.current && audioFile) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#0a83f5',
        progressColor: '#737373',
        cursorColor: '#ddd5e9',
        height: 100,
        normalize: true,
      });

      const wavesurfer = wavesurferRef.current;
      wavesurfer.load(audioFile);

      wavesurfer.on('ready', () => {
        wavesurfer.setPlaybackRate(currentSpeed);
      });

      wavesurfer.on('finish', () => handleNextVerse());
      wavesurfer.on('play', () => setIsPlaying(true));
      wavesurfer.on('pause', () => setIsPlaying(false));
      wavesurfer.on('error', (e) => console.error(`Wavesurfer error: ${e}`));

      return () => wavesurfer.destroy();
    }
  }, [selectedVerse, audioFile]);

  const handlePlayPause = () => wavesurferRef.current?.playPause();

  const handleStop = () => {
    wavesurferRef.current?.stop();
    setIsPlaying(false);
  };

  const getNextAvailableVerse = (
    current: number,
    direction: 1 | -1
  ): number => {
    const currentIndex = availableVerses.indexOf(current);
    if (currentIndex === -1) return current;

    const nextIndex = currentIndex + direction;

    // If next index is valid, return that verse
    if (nextIndex >= 0 && nextIndex < availableVerses.length) {
      return availableVerses[nextIndex];
    }

    // Otherwise, stay on current verse
    return current;
  };

  const handleBackward = () => {
    const previousVerse = getNextAvailableVerse(selectedVerse, -1);
    if (previousVerse !== selectedVerse) {
      setSelectedVerse(previousVerse);
      localStorage.setItem('lastPlayedVerse', previousVerse.toString());
    }
  };

  const handleForward = () => {
    const nextVerse = getNextAvailableVerse(selectedVerse, 1);
    if (nextVerse !== selectedVerse) {
      setSelectedVerse(nextVerse);
      localStorage.setItem('lastPlayedVerse', nextVerse.toString());
    }
  };

  const handleNextVerse = () => {
    const nextVerse = getNextAvailableVerse(selectedVerse, 1);
    if (nextVerse !== selectedVerse) {
      setSelectedVerse(nextVerse);
      localStorage.setItem('lastPlayedVerse', nextVerse.toString());
    }
  };

  const handleSpeed = () => {
    const speeds = [1, 1.5, 2];
    const nextSpeed =
      speeds[(speeds.indexOf(currentSpeed) + 1) % speeds.length];
    wavesurferRef.current?.setPlaybackRate(nextSpeed);
    setCurrentSpeed(nextSpeed);
  };

  // Styles defined as React objects
  const styles = {
    playerContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      background: '#1e1e1e',
      padding: '20px',
      boxSizing: 'border-box' as const,
    },
    audioPlayer: {
      display: 'flex',
      flexDirection: 'column' as const,
      width: '100%',
      maxWidth: '1200px', // Increased from 800px to use space better
      gap: '24px', // Increased gap for better spacing
    },
    verseButtons: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      justifyContent: 'center', // Center the verse buttons
      gap: '12px', // Increased gap between verse buttons
      marginBottom: '20px',
      width: '100%', // Take full width
    },
    waveform: {
      width: '100%',
      height: '120px', // Slightly increased height
      borderRadius: '10px',
      backgroundColor: '#2a2a2a',
    },
    controls: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      gap: '24px', // Increased gap between control buttons
      marginTop: '10px',
    },
    controlButton: {
      flex: 'none',
      width: '60px', // Increased size
      height: '60px', // Increased size
      borderRadius: '12px',
      background: '#444',
      border: 'none',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)', // Added subtle shadow
    },
    verseButton: {
      flex: '0 0 auto', // Don't grow but allow shrinking
      minWidth: '48px', // Minimum width
      height: '48px',
      borderRadius: '8px',
      background: '#444',
      border: 'none',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none',
    },
    disabled: {
      opacity: 0.5,
      pointerEvents: 'none' as const,
      cursor: 'not-allowed' as const,
    },
    selected: {
      background: '#0a83f5',
      color: 'white',
      boxShadow: '0 0 8px rgba(10, 131, 245, 0.6)', // Glow effect for selected
    },
    unavailable: {
      background: '#333',
      color: '#666',
    },
    speedButton: {
      fontWeight: 'bold' as const,
      fontSize: '16px', // Increased font size
    },
    header: {
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold' as const,
      marginBottom: '10px',
      textAlign: 'center' as const,
      width: '100%',
    },
  };

  return (
    <div style={styles.playerContainer}>
      <div style={styles.audioPlayer}>
        <div style={styles.header}>Audio Player</div>

        <div style={styles.verseButtons}>
          {Array.from({ length: TOTAL_VERSES }, (_, i) => i + 1).map(
            (verseNumber) => {
              const isAudioAvailable = Object.keys(metadata.ingredients).some(
                (key) => key.includes(`/1/${verseNumber}.wav`)
              );

              const buttonStyle = {
                ...styles.verseButton,
                ...(selectedVerse === verseNumber ? styles.selected : {}),
                ...(isAudioAvailable ? {} : styles.unavailable),
              };

              return (
                <button
                  key={verseNumber}
                  style={buttonStyle}
                  onClick={() => {
                    if (isAudioAvailable) {
                      setSelectedVerse(verseNumber);
                      localStorage.setItem(
                        'lastPlayedVerse',
                        verseNumber.toString()
                      );
                    }
                  }}
                  disabled={!isAudioAvailable}
                >
                  {verseNumber}
                </button>
              );
            }
          )}
        </div>

        <div ref={waveformRef} style={styles.waveform}></div>

        <div style={styles.controls}>
          <button
            style={{
              ...styles.controlButton,
              ...(availableVerses.indexOf(selectedVerse) <= 0
                ? styles.disabled
                : {}),
            }}
            onClick={handleBackward}
            disabled={availableVerses.indexOf(selectedVerse) <= 0}
          >
            <Rewind size={28} />
          </button>
          <button
            style={{
              ...styles.controlButton,
              ...(audioFile ? {} : styles.disabled),
            }}
            onClick={handlePlayPause}
            disabled={!audioFile}
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} />}
          </button>
          <button
            style={{
              ...styles.controlButton,
              ...(audioFile ? {} : styles.disabled),
            }}
            onClick={handleStop}
            disabled={!audioFile}
          >
            <StopCircle size={28} />
          </button>
          <button
            style={{
              ...styles.controlButton,
              ...(availableVerses.indexOf(selectedVerse) >=
              availableVerses.length - 1
                ? styles.disabled
                : {}),
            }}
            onClick={handleForward}
            disabled={
              availableVerses.indexOf(selectedVerse) >=
              availableVerses.length - 1
            }
          >
            <FastForward size={28} />
          </button>
          <button
            style={{
              ...styles.controlButton,
              ...styles.speedButton,
              ...(audioFile ? {} : styles.disabled),
            }}
            onClick={handleSpeed}
            disabled={!audioFile}
          >
            {currentSpeed}X
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerComponent;
