import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Howl } from 'howler';
interface IWaveformProps {
  url: string;
  control: string;
  theme: string;
  setControl: (control: string) => void;
  volume: number;
  speed: number;
}

export const Waveform: React.FC<IWaveformProps> = ({
  url,
  control,
  theme,
  setControl,
  volume,
  speed,
}) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const [howl, setHowl] = useState<Howl | null>(null);
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [audioBlob, setAudioBlob] = useState<string | null>(null);

  // Initialize WaveSurfer and Howl
  useEffect(() => {
    if (!url || !waveformRef.current) return;

    setIsLoading(true);
    
    // Cleanup previous instances
    if (howl) {
      howl.unload();
      setHowl(null);
    }
    if (waveSurfer) {
      waveSurfer.destroy();
      setWaveSurfer(null);
    }

    // Create WaveSurfer instance
    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#22D3EE',
      progressColor: theme === 'dark' ? '#FFFFFF' : '#000000',
      cursorColor: '#22D3EE',
      height: 'auto',
      hideScrollbar: true,
      interact: true,
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      backend: 'MediaElement',
    });

    // Load audio file
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        setAudioBlob(blobUrl);

        const sound = new Howl({
          src: [blobUrl],
          volume: volume,
          rate: speed,
          format: ['mp3', 'wav'],
          html5: true,
          onload: () => {
            setIsLoading(false);
          },
          onplay: () => {
            ws.play();
          },
          onpause: () => {
            ws.pause();
          },
          onstop: () => {
            ws.stop();
            setControl('stop');
          },
          onend: () => {
            ws.stop();
            setControl('stop');
          },
          onloaderror: (id, error) => {
            console.error('Howl loading error:', error);
            setControl('stop');
            setIsLoading(false);
          }
        });

        ws.load(blobUrl);
        setWaveSurfer(ws);
        setHowl(sound);
      })
      .catch(error => {
        console.error('Audio loading error:', error);
        setIsLoading(false);
        setControl('stop');
      });

    return () => {
      if (audioBlob) {
        URL.revokeObjectURL(audioBlob);
      }
      ws.destroy();
    };
  }, [url, theme, volume, speed]);

  // Handle playback controls
  useEffect(() => {
    if (!howl || !waveSurfer || isLoading) return;

    try {
      switch (control) {
        case 'play': {
          howl.play();
          break;
        }
        case 'pause': {
          howl.pause();
          break;
        }
        case 'rewind': {
          howl.stop();
          howl.seek(0);
          waveSurfer.seekTo(0);
          setControl('stop');
          break;
        }
        case 'stop': {
          howl.stop();
          waveSurfer.seekTo(0);
          break;
        }
      }
    } catch (error) {
      console.error('Playback control error:', error);
      setControl('stop');
    }
  }, [control, howl, waveSurfer, setControl, isLoading]);

  // Handle volume changes
  useEffect(() => {
    if (howl && waveSurfer && !isLoading) {
      const newVolume = Math.min(Math.max(volume, 0), 1);
      howl.volume(newVolume);
      waveSurfer.setVolume(newVolume);
    }
  }, [volume, howl, waveSurfer, isLoading]);

  // Handle speed changes
  useEffect(() => {
    if (howl && waveSurfer && !isLoading) {
      howl.rate(speed);
      waveSurfer.setPlaybackRate(speed);
    }
  }, [speed, howl, waveSurfer, isLoading]);

  return (
    <div className="flex items-center justify-between w-full gap-3">
      <div
        className="flex-1 relative h-16"
        ref={waveformRef}
        id="wav-container"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm text-gray-500">Loading audio...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Waveform;