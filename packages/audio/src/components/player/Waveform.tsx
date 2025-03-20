import React, { useEffect, useRef } from 'react';
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
  const howlRef = useRef<Howl | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const playingRef = useRef<boolean>(false);

  const updateWaveformPosition = () => {
    if (howlRef.current && waveSurferRef.current && playingRef.current) {
      try {
        const currentTime = howlRef.current.seek() as number;
        const duration = howlRef.current.duration();

        if (duration && duration > 0 && typeof currentTime === 'number') {
          waveSurferRef.current.seekTo(currentTime / duration);
        }
      } catch (err) {
        console.error('Error in animation frame:', err);
      }

      animationFrameRef.current = window.requestAnimationFrame(
        updateWaveformPosition
      );
    }
  };

  const startProgressAnimation = () => {
    stopProgressAnimation();
    playingRef.current = true;
    animationFrameRef.current = window.requestAnimationFrame(
      updateWaveformPosition
    );
  };

  const stopProgressAnimation = () => {
    playingRef.current = false;
    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const cleanupAudio = () => {
    stopProgressAnimation();
    if (howlRef.current) {
      howlRef.current.stop();
      howlRef.current.unload();
      howlRef.current = null;
    }
    if (waveSurferRef.current) {
      waveSurferRef.current.destroy();
      waveSurferRef.current = null;
    }
  };

  useEffect(() => {
    if (!url || !waveformRef.current) return;
    cleanupAudio();
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
      backend: 'WebAudio',
    });
    waveSurferRef.current = ws;
    ws.on('finish', () => {
      setControl('stop');
      stopProgressAnimation();
    });

    ws.on('click', (relativeX) => {
      if (howlRef.current) {
        const duration = howlRef.current.duration();
        const newPos = duration * relativeX;
        howlRef.current.seek(newPos);

        if (playingRef.current) {
          howlRef.current.play();
        } else {
          ws.seekTo(relativeX);
        }
      }
    });

    ws.load(url);
    ws.setVolume(0);

    const sound = new Howl({
      src: [url],
      volume: volume,
      rate: speed,
      format: ['mp3', 'wav'],
      html5: true,
      pool: 1,
      onplay: startProgressAnimation,
      onpause: stopProgressAnimation,
      onstop: () => {
        if (ws) ws.seekTo(0);
        stopProgressAnimation();
      },
      onend: () => {
        if (ws) ws.seekTo(0);
        stopProgressAnimation();
        setControl('stop');
      },
      onloaderror: (id, error) => {
        console.error('Howl load error:', error);
      },
      onplayerror: (id, error) => {
        console.error('Howl play error:', error);
      },
    });

    howlRef.current = sound;

    return cleanupAudio;
  }, [url, theme]);

  useEffect(() => {
    const sound = howlRef.current;
    const ws = waveSurferRef.current;

    if (!sound || !ws) return;

    try {
      switch (control) {
        case 'play': {
          sound.volume(Math.min(Math.max(volume, 0), 1));
          sound.play();
          break;
        }
        case 'pause': {
          sound.pause();
          break;
        }
        case 'rewind': {
          sound.seek(0);
          ws.seekTo(0);
          setControl('play');
          break;
        }
        case 'stop': {
          sound.stop();
          ws.seekTo(0);
          break;
        }
      }
    } catch (error) {
      console.error('Control error:', error);
    }
  }, [control]);

  useEffect(() => {
    if (howlRef.current) {
      howlRef.current.volume(Math.min(Math.max(volume, 0), 1));
    }
  }, [volume]);

  useEffect(() => {
    if (howlRef.current && waveSurferRef.current) {
      howlRef.current.rate(speed);
      waveSurferRef.current.setPlaybackRate(speed);
    }
  }, [speed]);

  return (
    <div className='flex items-center justify-between w-full gap-3'>
      <div
        className='flex-1 relative h-16'
        ref={waveformRef}
        id='wav-container'
      ></div>
    </div>
  );
};

export default Waveform;
