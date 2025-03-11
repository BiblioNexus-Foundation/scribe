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
  const howlRef = useRef<Howl | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const seekingRef = useRef<boolean>(false);
  const lastPositionRef = useRef<number>(0);
  const [howl, setHowl] = useState<Howl | null>(null);
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);

  // Initialize WaveSurfer and Howl
  useEffect(() => {
    if (!url || !waveformRef.current) return;

    // Cleanup previous instances
    if (howlRef.current) {
      howlRef.current.stop();
      howlRef.current.unload();
    }

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
      backend: 'WebAudio',
    });

    ws.on('finish', () => {
      isPlayingRef.current = false;
      setControl('stop');
    });

    ws.on('interaction', (position) => {
      if (!howlRef.current) return;

      lastPositionRef.current = position;

      seekingRef.current = true;

      const wasPlaying = isPlayingRef.current;

      try {
        const duration = howlRef.current.duration();
        const seekTime = position * duration;

        howlRef.current.seek(seekTime);

        ws.seekTo(position);

        if (wasPlaying) {
          isPlayingRef.current = true;
        }
      } catch (error) {
        console.error('Seeking error:', error);
      } finally {
        seekingRef.current = false;
      }
    });

    ws.on('ready', () => {
      ws.setVolume(0);
    });

    ws.load(url);

    const sound = new Howl({
      src: [url],
      volume: volume,
      rate: speed,
      format: ['mp3', 'wav'],
      html5: true,
      onload: () => {
        isPlayingRef.current = false;
      },
      onplay: () => {
        if (!seekingRef.current) {
          isPlayingRef.current = true;
          ws.play();
        }
      },
      onpause: () => {
        if (!seekingRef.current) {
          isPlayingRef.current = false;
          ws.pause();
        }
      },
      onstop: () => {
        isPlayingRef.current = false;
        ws.stop();
        ws.seekTo(0);
      },
      onend: () => {
        isPlayingRef.current = false;
        ws.stop();
        ws.seekTo(0);
        setControl('stop');
      },
      onloaderror: (id, error) => {
        console.error('Howl loading error:', error);
      },
      onseek: () => {
        if (!seekingRef.current && howlRef.current) {
          const currentPos = howlRef.current.seek() as number;
          const duration = howlRef.current.duration();
          if (duration > 0) {
            ws.seekTo(currentPos / duration);
          }
        }
      },
    });

    setWaveSurfer(ws);
    setHowl(sound);
    howlRef.current = sound;

    return () => {
      if (howlRef.current) {
        howlRef.current.stop();
        howlRef.current.unload();
      }
      ws.destroy();
    };
  }, [url, theme]);

  useEffect(() => {
    if (!howl || !waveSurfer) return;

    try {
      switch (control) {
        case 'play': {
          const currentHowlPos = howl.seek() as number;
          const duration = howl.duration();
          if (duration > 0) {
            waveSurfer.seekTo(currentHowlPos / duration);
          }

          const newVolume = Math.min(Math.max(volume, 0), 1);
          howl.volume(newVolume);
          howl.play();
          isPlayingRef.current = true;
          break;
        }
        case 'pause': {
          howl.pause();
          isPlayingRef.current = false;
          break;
        }
        case 'rewind': {
          howl.seek(0);
          waveSurfer.seekTo(0);
          setControl('play');
          break;
        }
        case 'stop': {
          howl.stop();
          waveSurfer.seekTo(0);
          isPlayingRef.current = false;
          break;
        }
      }
    } catch (error) {
      console.error('Playback control error:', error);
    }
  }, [control]);

  useEffect(() => {
    if (howl) {
      const newVolume = Math.min(Math.max(volume, 0), 1);
      howl.volume(newVolume);
    }
  }, [volume]);

  useEffect(() => {
    if (howl && waveSurfer) {
      howl.rate(speed);
      waveSurfer.setPlaybackRate(speed);
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
