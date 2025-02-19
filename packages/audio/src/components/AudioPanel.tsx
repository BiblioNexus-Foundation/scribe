import * as React from 'react';
import {
  IconMicrophone,
  IconPlayerPause,
  IconPlayerPlay,
  IconRefresh,
  IconSettings,
  IconTrashX,
  IconPlayerStop,
} from '@tabler/icons-react';
import ButtonGroups from 'scribe-ui/lib/components/ButtonGroup';
import Button from 'scribe-ui/lib/components/Button';
import Waveform from './player/Waveform';
import { useState, useEffect } from '@theia/core/shared/react';

interface Option {
  label: string;
  value: string;
}
import VolumeBar from './player/VolumeBar';
import SelectDropdown from './common/SelectDropdown';
import RealTimeWaveform from './recorder/RealTimeWaveform';
import { AudioController } from './recorder/AudioController';
import { FFmpegServer } from '../common/audio-protocol';

interface AudioPanelProps {
  theme: any;
  server: FFmpegServer;
}
const options = [
  { label: '1', value: 1.0 },
  { label: '1.5', value: 1.5 },
  { label: '2', value: 2.0 },
];
export const AudioPanel: React.FC<AudioPanelProps> = ({ theme, server }) => {
  const [volume, setVolume] = useState<number>(0.7);
  const [playbackSpeed, setPlaybackSpeed] = useState<{
    label: string;
    value: number;
  }>(options[0]);
  const [displayWave, setDisplayWave] = useState<string>('recorder');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentFile, setCurrentFile] = useState<string>('');
  const [audioController] = useState(() => new AudioController(server));
  const [control, setControl] = useState('');
  const [waveformState, setWaveformState] = useState('stop');
  const [currentOS, setCurrentOS] = useState('');
  const [devices, setDevices] = useState<Option[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Option | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  useEffect(() => {
    const getDevices = async () => {
      const listDevices = await server.getAudioDevices();
      const deviceOptions = listDevices.map((device) => ({
        label: device.name,
        value: device.alternativeName,
      }));
      setDevices(deviceOptions);
      if (deviceOptions.length > 0) {
        setSelectedDevice(deviceOptions[0]);
        server.setSelectedDevice(deviceOptions[0].value);
      }
    };

    if ((!devices || devices.length === 0) && currentOS === 'win32') {
      getDevices();
    }
  }, []);

  const handlePlaybackControl = (control: string) => {
    if (!isRecording && currentFile) {
      setControl(control);
    }
  };

  const handlePauseResume = async () => {
    try {
      if (isRecording && !hasRecorded) {
        if (isPaused) {
          await audioController.resumeRecording();
          setIsPaused(false);
          setWaveformState('resume');
        } else {
          await audioController.pauseRecording();
          setIsPaused(true);
          setWaveformState('pause');
        }
      }
    } catch (error) {
      console.error('Pause/Resume error:', error);
    }
  };

  const handleStop = async () => {
    try {
      if (isRecording && !isPaused && !hasRecorded) {
        const filePath = await audioController.stopRecording();
        setIsRecording(false);
        setIsPaused(false);
        setWaveformState('stop');
        setHasRecorded(true);
        if (filePath) {
          setCurrentFile(filePath);
          setDisplayWave('player');
        }
      }
    } catch (error) {
      console.error('Stop recording error:', error);
    }
  };

  const handleRecord = async () => {
    try {
      if (!isRecording && !hasRecorded) {
        await audioController.startRecording();
        setIsRecording(true);
        setControl('stop');
        setCurrentFile('');
        setWaveformState('start');
        setDisplayWave('recorder');
      }
    } catch (error) {
      console.error('Recording error:', error);
    }
  };

  const handleDelete = () => {
    if (currentFile) {
      server.deleteFile(currentFile);
      setCurrentFile('');
      setControl('stop');
      setDisplayWave('recorder');
      setHasRecorded(false); // Reset recorded state after deletion
    }
  };

  // In the getButtonClass function
  const getButtonClass = (isActive: boolean): string => {
    if (!isActive) {
      return 'rounded-lg opacity-50 cursor-not-allowed pointer-events-none'; // Changed pointer-not-allowed to pointer-events-none
    }
    return hasRecorded && !currentFile
      ? 'rounded-lg opacity-50 cursor-not-allowed pointer-events-none' // Added pointer-events-none here as well
      : 'rounded-lg opacity-100 cursor-pointer';
  };

  // In the getPlayButtonClass function
  const getPlayButtonClass = (isActive: boolean): string => {
    const baseClasses = 'dark:bg-cyan-500 rounded-lg bg-cyan-400';
    const activeClasses =
      'hover:bg-cyan-500 dark:hover:bg-cyan-400 text-zinc-800 dark:text-zinc-50 dark:border-cyan-700 cursor-pointer';
    const inactiveClasses = 'opacity-50 cursor-not-allowed pointer-events-none'; // Added pointer-events-none

    if (!isActive) {
      return `${baseClasses} ${inactiveClasses}`;
    }
    return `${baseClasses} ${activeClasses}`;
  };

  useEffect(() => {
    const getOS = async () => {
      const os = await server.getSystemOS();
      setCurrentOS(os);
    };
    if (!currentOS) {
      getOS();
    }
  }, []);

  return (
    <div className=''>
      <div>
        <ButtonGroups />
      </div>
      <div className='h-[30%] border-t border-[rgb(250 250 250 / 0.1)]'>
        {displayWave === 'recorder' ? (
          <RealTimeWaveform waveformState={waveformState} theme={theme} />
        ) : (
          <Waveform
            url={currentFile}
            control={control}
            theme={theme}
            setControl={setControl}
            volume={volume}
            speed={playbackSpeed.value}
          />
        )}
      </div>
      <div className='flex h-[30%] border-t border-[rgb(250 250 250 / 0.1)]'>
        <div className='2xl:w-[15%] w-[20%] flex flex-col gap-4 items-center'>
          <span className='uppercase leading-3 dark:text-zinc-500 text-zinc-400 text-[10px] font-medium'>
            Speed
          </span>
          <SelectDropdown
            options={options}
            selectedOption={playbackSpeed}
            setSelectedOption={setPlaybackSpeed}
          />
        </div>
        <div className='w-[1px] h-7 mt-auto bg-gray-300 dark:bg-zinc-700' />
        <div className='2xl:w-[15%] w-[20%] flex gap-7 justify-center'>
          <div className='space-y-2'>
            <p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px] font-medium'>
              {isRecording ? (isPaused ? 'Resume' : 'Pause') : 'Record'}
            </p>
            <Button
              className={getButtonClass(!hasRecorded)}
              onClick={
                !hasRecorded
                  ? isRecording
                    ? handlePauseResume
                    : handleRecord
                  : undefined
              }
              icon={
                isRecording ? (
                  isPaused ? (
                    <IconPlayerPlay
                      size={14}
                      stroke={2}
                      strokeLinejoin='miter'
                    />
                  ) : (
                    <IconPlayerPause
                      size={14}
                      stroke={2}
                      strokeLinejoin='miter'
                    />
                  )
                ) : (
                  <IconMicrophone size={14} stroke={2} strokeLinejoin='miter' />
                )
              }
            />
          </div>
          <div className='space-y-2'>
            <p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px] font-medium'>
              Stop
            </p>
            <Button
              className={getButtonClass(
                isRecording && !isPaused && !hasRecorded
              )}
              onClick={
                isRecording && !isPaused && !hasRecorded
                  ? handleStop
                  : undefined
              }
              icon={
                <IconPlayerStop size={14} stroke={2} strokeLinejoin='miter' />
              }
            />
          </div>
        </div>
        <div className='w-[1px] h-7 mt-auto bg-gray-300 dark:bg-zinc-700' />
        <div className='2xl:w-[40%] w-[50%] flex justify-between gap-7 px-16'>
          <div className='space-y-2'>
            {control === 'play' ? (
              <>
                <p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
                  Pause
                </p>
                <Button
                  className={getButtonClass(
                    !isRecording && Boolean(currentFile)
                  )}
                  icon={
                    <IconPlayerPause
                      size={14}
                      stroke={2}
                      strokeLinejoin='miter'
                    />
                  }
                  onClick={
                    !isRecording && currentFile
                      ? () => handlePlaybackControl('pause')
                      : undefined
                  }
                />
              </>
            ) : (
              <>
                <p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
                  Play
                </p>
                <Button
                  className={getPlayButtonClass(
                    !isRecording && Boolean(currentFile)
                  )}
                  icon={
                    <IconPlayerPlay
                      size={14}
                      stroke={2}
                      strokeLinejoin='miter'
                    />
                  }
                  onClick={
                    !isRecording && currentFile
                      ? () => handlePlaybackControl('play')
                      : undefined
                  }
                />
              </>
            )}
          </div>
          <div className='space-y-2'>
            <p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
              Stop
            </p>
            <Button
              className={getButtonClass(!isRecording && Boolean(currentFile))}
              icon={
                <IconPlayerStop size={14} stroke={2} strokeLinejoin='miter' />
              }
              onClick={
                !isRecording && currentFile
                  ? () => handlePlaybackControl('stop')
                  : undefined
              }
            />
          </div>
          <div className='space-y-2'>
            <p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
              Rewind
            </p>
            <Button
              className={getButtonClass(!isRecording && Boolean(currentFile))}
              icon={<IconRefresh size={14} stroke={2} strokeLinejoin='miter' />}
              onClick={
                !isRecording && currentFile
                  ? () => handlePlaybackControl('rewind')
                  : undefined
              }
            />
          </div>
          <div className='space-y-2'>
            <p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
              Delete
            </p>
            <Button
              className={getButtonClass(!isRecording && Boolean(currentFile))}
              icon={<IconTrashX size={14} stroke={2} strokeLinejoin='miter' />}
              onClick={!isRecording && currentFile ? handleDelete : undefined}
            />
          </div>
          <div className='space-y-4'>
            <VolumeBar
              volume={volume}
              setVolume={(value: React.SetStateAction<number>) =>
                setVolume(value)
              }
            />
          </div>
        </div>
        <div className='w-[1px] h-7 mt-auto bg-gray-300 dark:bg-zinc-700' />
        <div className='2xl:w-[10%] w-[15%] flex flex-col gap-4 items-center'>
          <p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px] font-medium'>
            Settings
          </p>
          <IconSettings
            size={24}
            stroke={2}
            strokeLinejoin='miter'
            className='dark:text-zinc-50 text-zinc-500 cursor-pointer'
            onClick={
              currentOS === 'win32'
                ? handleSettingsClick
                : () => server.openAudioSettings()
            }
          />
          {currentOS === 'win32' && showSettings && (
            <SelectDropdown
              options={devices || []}
              selectedOption={
                selectedDevice || { label: 'Select device', value: '' }
              }
              setSelectedOption={(option: Option) => {
                setSelectedDevice(option);
                server.setSelectedDevice(option.value);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
