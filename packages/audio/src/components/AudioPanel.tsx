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
import { useState } from '@theia/core/shared/react';
import VolumeBar from './player/VolumeBar';
import SelectDropdown from './common/SelectDropdown';
import RealTimeWaveform from './recorder/RealTimeWaveform';

interface AudioPanelProps {
  theme: any;
}
const options = [
  { label: '1', value: 1.0 },
  { label: '1.5', value: 1.5 },
  { label: '2', value: 2.0 },
];
export const AudioPanel: React.FC<AudioPanelProps> = ({ theme }) => {
  const [control, setControl] = useState('');
  const [volume, setVolume] = useState<number>(0.7);
  const [playbackSpeed, setPlaybackSpeed] = useState<{
    label: string;
    value: number;
  }>(options[0]);
  const [displayWave, setDisplayWave] = useState<string>('recorder');

  return (
    <div className=''>
      <div>
        <ButtonGroups />
      </div>
      <div className=' h-[30%]  border-t border-[rgb(250 250 250 / 0.1)] '>
        {displayWave === 'recorder' ? (
          <RealTimeWaveform waveformState={control} theme={theme} />
        ) : (
          <Waveform
            url={
              'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3'
            }
            control={control}
            theme={theme}
            setControl={(value: React.SetStateAction<string>) =>
              setControl(value)
            }
            volume={volume}
            speed={playbackSpeed.value}
          />
        )}
      </div>
      <div className='flex h-[30%]  border-t border-[rgb(250 250 250 / 0.1)]'>
        <div className='2xl:w-[15%] w-[20%] flex flex-col gap-4 items-center '>
          <span className='uppercase leading-3 dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
            Speed
          </span>
          <SelectDropdown
            options={options}
            selectedOption={playbackSpeed}
            setSelectedOption={(
              value: React.SetStateAction<{
                label: string;
                value: number;
              }>,
            ) => setPlaybackSpeed(value)}
          />
        </div>
        <div className='w-[1px] h-7 mt-auto bg-gray-300 dark:bg-zinc-700' />
        <div className='2xl:w-[15%] w-[20%] flex gap-7 justify-center '>
          <div className='space-y-2'>
            <p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px] font-medium '>
              Record
            </p>
            <Button
              className='rounded-lg'
              icon={
                <IconMicrophone size={14} stroke={2} strokeLinejoin='miter' />
              }
              onClick={() => {
                setControl('start'), setDisplayWave('recorder');
              }}
            />
          </div>
          <div className='space-y-2'>
            <p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
              Stop
            </p>
            <Button
              className='rounded-lg'
              icon={
                <IconPlayerStop size={14} stroke={2} strokeLinejoin='miter' />
              }
              onClick={() => {
                setControl('stop'), setDisplayWave('player');
              }}
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
                  className='rounded-lg'
                  icon={
                    <IconPlayerPause
                      size={14}
                      stroke={2}
                      strokeLinejoin='miter'
                    />
                  }
                  onClick={() => {
                    setControl('pause'), setDisplayWave('player');
                  }}
                />
              </>
            ) : (
              <>
                <p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
                  Play
                </p>
                <Button
                  className='dark:bg-cyan-500 rounded-lg bg-cyan-400 hover:bg-cyan-500 dark:hover:bg-cyan-400 text-zinc-800 dark:text-zinc-50  dark:border-cyan-700'
                  icon={
                    <IconPlayerPlay
                      size={14}
                      stroke={2}
                      strokeLinejoin='miter'
                    />
                  }
                  onClick={() => {
                    setControl('play'), setDisplayWave('player');
                  }}
                />
              </>
            )}
          </div>
          <div className='space-y-2'>
            <p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
              Stop
            </p>
            <Button
              className='rounded-lg'
              icon={
                <IconPlayerStop size={14} stroke={2} strokeLinejoin='miter' />
              }
              onClick={() => {
                setControl('stop'), setDisplayWave('player');
              }}
            />
          </div>
          <div className='space-y-2'>
            <p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
              Rewind
            </p>
            <Button
              className='rounded-lg'
              icon={<IconRefresh size={14} stroke={2} strokeLinejoin='miter' />}
              onClick={() => {
                setControl('rewind'), setDisplayWave('player');
              }}
            />
          </div>
          <div className='space-y-2'>
            <p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
              Delete
            </p>
            <Button
              className='rounded-lg'
              icon={<IconTrashX size={14} stroke={2} strokeLinejoin='miter' />}
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
        <div className='2xl:w-[10%] w-[15%] flex flex-col gap-4 items-center  '>
          <p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px] font-medium '>
            Settings
          </p>
          <IconSettings
            size={24}
            stroke={2}
            strokeLinejoin='miter'
            className='dark:text-zinc-50 text-zinc-500'
          />
        </div>
      </div>
    </div>
  );
};
