import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';

interface IRealTimeWaveform {
  waveformState: string;
  theme: string;
}

const RealTimeWaveform: React.FC<IRealTimeWaveform> = ({
  waveformState,
  theme,
}) => {
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const recordRef = useRef<any>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);

  // Initialize Wavesurfer and Record plugin
  const createWaveSurfer = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current!,
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

    recordRef.current = wavesurferRef.current.registerPlugin(
      RecordPlugin.create({
        renderRecordedAudio: false,
        scrollingWaveform: true,
      }),
    );
  };

  useEffect(() => {
    if (recordRef.current) {
      switch (waveformState) {
        case 'start': {
          recordRef.current.startRecording();
          break;
        }
        case 'stop': {
          recordRef.current.stopRecording();
          break;
        }
        case 'pause': {
          recordRef.current.pauseRecording();
          break;
        }
        case 'resume': {
          recordRef.current.resumeRecording();
          break;
        }
        default:
          break;
      }
    }
  }, [waveformState]);

  useEffect(() => {
    if (waveformState === 'start' && !recordRef.current) {
      createWaveSurfer();

      recordRef.current.startRecording();

      return () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy();
        }
      };
    }
  }, [waveformState]);

  return (
    <div className='flex items-center justify-between w-full gap-3'>
      <div
        className='flex-1 relative h-16'
        ref={waveformRef}
        id='wav-container'
      />
    </div>
  );
};

export default RealTimeWaveform;
