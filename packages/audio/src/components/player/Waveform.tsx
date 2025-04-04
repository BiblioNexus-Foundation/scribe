import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

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
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const playingRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  const updateWaveformPosition = () => {
    if (waveSurferRef.current && playingRef.current) {
      try {
        const ws = waveSurferRef.current;
        const currentTime = ws.getCurrentTime();
        const duration = ws.getDuration();

        if (duration > 0 && duration - currentTime <= 0.05) {
          ws.stop();
          stopProgressAnimation();
          setControl("stop");
          return;
        }
      } catch (err) {
        console.error("Error in animation frame:", err);
      }

      animationFrameRef.current = window.requestAnimationFrame(updateWaveformPosition);
    }
  };

  const startProgressAnimation = () => {
    stopProgressAnimation();
    playingRef.current = true;
    animationFrameRef.current = window.requestAnimationFrame(updateWaveformPosition);
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
    if (waveSurferRef.current) {
      waveSurferRef.current.stop();
      waveSurferRef.current.destroy();
      waveSurferRef.current = null;
      setIsReady(false);
    }
  };

  useEffect(() => {
    if (!url || !waveformRef.current) return;
    cleanupAudio();

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#22D3EE",
      progressColor: theme === "dark" ? "#FFFFFF" : "#000000",
      cursorColor: "#22D3EE",
      height: "auto",
      hideScrollbar: true,
      interact: true,
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      normalize: true,
      backend: "MediaElement",
    });
    waveSurferRef.current = ws;

    ws.on("ready", () => {
      setIsReady(true);
      ws.setVolume(Math.min(Math.max(volume, 0), 1));

      try {
        ws.setPlaybackRate(speed);
      } catch (err) {
        console.error("Error setting initial playback rate:", err);
      }
    });

    ws.on("finish", () => {
      ws.stop();
      stopProgressAnimation();
      setControl("stop");
    });

    ws.on("play", () => {
      startProgressAnimation();
    });

    ws.on("pause", () => {
      stopProgressAnimation();
    });

    ws.on("click", (relativeX) => {
      if (playingRef.current) {
        ws.seekTo(relativeX);
        ws.play();
      } else {
        ws.seekTo(relativeX);
      }
    });

    ws.load(url);

    return cleanupAudio;
  }, [url, theme]);

  useEffect(() => {
    const ws = waveSurferRef.current;
    if (!ws || !isReady) return;

    try {
      ws.setPlaybackRate(speed);
    } catch (err) {
      console.error("Error setting playback rate:", err);
    }
  }, [speed, isReady]);

  useEffect(() => {
    const ws = waveSurferRef.current;
    if (!ws || !isReady) return;

    try {
      switch (control) {
        case "play": {
          ws.setVolume(Math.min(Math.max(volume, 0), 1));
          ws.play();
          break;
        }
        case "pause": {
          ws.pause();
          break;
        }
        case "rewind": {
          ws.seekTo(0);
          setControl("play");
          ws.play();
          break;
        }
        case "stop": {
          ws.stop();
          break;
        }
      }
    } catch (error) {
      console.error("Control error:", error);
    }
  }, [control, setControl, volume, isReady]);

  useEffect(() => {
    const ws = waveSurferRef.current;
    if (ws && isReady) {
      ws.setVolume(Math.min(Math.max(volume, 0), 1));
    }
  }, [volume, isReady]);

  return (
    <div className="flex w-full items-center justify-between gap-3">
      <div className="relative h-16 flex-1" ref={waveformRef} id="wav-container"></div>
    </div>
  );
};

export default Waveform;
