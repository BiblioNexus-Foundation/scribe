import React, { useEffect, useRef, useState } from 'react';
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
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const recorderRef = useRef<RecordPlugin | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeWaveSurfer = async () => {
      if (!waveformRef.current || wavesurferRef.current) return;

      try {
        // Request microphone permissions first
        await navigator.mediaDevices.getUserMedia({ audio: true });

        const wavesurfer = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: theme === 'dark' ? '#22D3EE' : '#0891B2',
          progressColor: theme === 'dark' ? '#FFFFFF' : '#000000',
          cursorColor: '#22D3EE',
          height: 64,
          normalize: true,
          hideScrollbar: true,
          interact: false,
          barWidth: 2,
          barGap: 2,
          barRadius: 2,
          backend: 'WebAudio',
        });

        // Initialize record plugin
        const recorder = RecordPlugin.create({
          scrollingWaveform: true,
          renderRecordedAudio: true
        });

        wavesurfer.registerPlugin(recorder);

        wavesurferRef.current = wavesurfer;
        recorderRef.current = recorder;

        // Set up event listeners
        recorder.on('record-start', () => console.log('Recording started'));
        recorder.on('record-pause', () => console.log('Recording paused'));
        recorder.on('record-resume', () => console.log('Recording resumed'));
        recorder.on('record-end', () => console.log('Recording stopped'));

        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing WaveSurfer:', error);
        setError(error instanceof Error ? error.message : 'Failed to initialize audio recorder');
      }
    };

    initializeWaveSurfer();

    return () => {
      if (recorderRef.current?.isRecording()) {
        recorderRef.current.stopRecording();
      }
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
        recorderRef.current = null;
      }
    };
  }, [theme]);

  useEffect(() => {
    const handleRecording = async () => {
      if (!isInitialized || !recorderRef.current) return;

      try {
        switch (waveformState) {
          case 'start':
            if (!recorderRef.current.isRecording()) {
              await recorderRef.current.startRecording();
            }
            break;
          case 'stop':
            if (recorderRef.current.isRecording()) {
              await recorderRef.current.stopRecording();
              if (wavesurferRef.current) {
                wavesurferRef.current.empty();
              }
            }
            break;
          case 'pause':
            if (recorderRef.current.isRecording()) {
              await recorderRef.current.pauseRecording();
            }
            break;
          case 'resume':
            if (recorderRef.current.isPaused()) {
              await recorderRef.current.resumeRecording();
            }
            break;
        }
      } catch (error) {
        console.error('Recording operation error:', error);
        setError(error instanceof Error ? error.message : 'Recording operation failed');
      }
    };

    handleRecording();
  }, [waveformState, isInitialized]);

  return (
    <div className="flex items-center justify-between w-full gap-3">
      <div
        ref={waveformRef}
        className="flex-1 relative h-16"
        id="realtime-waveform"
      >
        {!isInitialized && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm text-gray-500">Initializing waveform...</span>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm text-red-500">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimeWaveform;