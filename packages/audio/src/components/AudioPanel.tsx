import * as React from 'react';
// import { Badge } from 'scribe-ui/lib/components/ui/Badge';
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

interface AudioPanelProps {
	// Define any props you might use here
	theme: any;
}

export const AudioPanel: React.FC<AudioPanelProps> = ({ theme }) => {
	const [control, setControl] = useState('');
	const [volume, setVolume] = useState(7);
	console.log('theme', theme);

	return (
		<div className=''>
			<div>
				<ButtonGroups />
			</div>
			<div className=' h-[30%]  border-t border-[rgb(250 250 250 / 0.1)] '>
				<Waveform
					url={
						'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3'
					}
					control={control}
					theme={theme}
					setControl={(value: React.SetStateAction<string>) =>
						setControl(value)
					}
					volume={volume/10}
				/>
			</div>
			{/* <div className=' h-[30%]  border-t border-[rgb(250 250 250 / 0.1)] '> */}
			{/* <IconAudio className="fill-zinc-100  w-[100vw]  dark:stroke-zinc-800 dark:fill-zinc-800 " /> */}

			<div className='flex h-[30%]  border-t border-[rgb(250 250 250 / 0.1)]'>
				<div className='2xl:w-[15%] w-[20%] flex flex-col gap-4 items-center '>
					<span className='uppercase leading-3 dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
						Audio
					</span>
					costom select
					{/* <CustomSelect
                options={sources}
                placeholder="Source"
                triggerClassName="w-fit h-5 uppercase gap-1 text-[10px] bg-cyan-400 text-zinc-50 rounded-full"
              /> */}
				</div>
				<div className='w-[1px] h-7 mt-auto bg-gray-300 dark:bg-zinc-700' />
				<div className='2xl:w-[15%] w-[20%] flex flex-col gap-4 items-center '>
					<span className='uppercase leading-3 dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
						Speed
					</span>
					speed select
					{/* <CustomSelect
                options={speeds}
                placeholder="2x"
                triggerClassName="w-fit h-5 uppercase gap-1 text-[10px] bg-cyan-400 text-zinc-50 rounded-full"
              /> */}
				</div>
				<div className='w-[1px] h-7 mt-auto bg-gray-300 dark:bg-zinc-700' />
				<div className='2xl:w-[40%] w-[50%] flex justify-between gap-7 px-16'>
					<div className='space-y-2'>
						<p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
							Record
						</p>
						<Button
							className='rounded-lg'
							icon={
								<IconMicrophone
									size={14}
									stroke={2}
									strokeLinejoin='miter'
								/>
							}
						/>
					</div>
					<div className='space-y-2'>
						<p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
							Stop
						</p>
						<Button
							className='rounded-lg'
							icon={
								<IconPlayerStop
									size={14}
									stroke={2}
									strokeLinejoin='miter'
								/>
							}
						/>
					</div>
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
									onClick={() => setControl('pause')}
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
									onClick={() => setControl('play')}
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
								<IconPlayerStop
									size={14}
									stroke={2}
									strokeLinejoin='miter'
								/>
							}
							onClick={() => setControl('stop')}
						/>
					</div>
					<div className='space-y-2'>
						<p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
							Rewind
						</p>
						<Button
							className='rounded-lg'
							icon={
								<IconRefresh
									size={14}
									stroke={2}
									strokeLinejoin='miter'
								/>
							}
							onClick={() => setControl('rewind')}
						/>
					</div>
					<div className='space-y-2'>
						<p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
							Delete
						</p>
						<Button
							className='rounded-lg'
							icon={
								<IconTrashX
									size={14}
									stroke={2}
									strokeLinejoin='miter'
								/>
							}
						/>
					</div>
					{/* <div className='space-y-4'>
						<p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px] text-center  font-medium '>
							Volume
						</p>
						<span className='flex items-center gap-x-2'>
							<IconMinus
								size={14}
								stroke={2}
								strokeLinejoin='miter'
								className='cursor-pointer dark:text-zinc-50 text-zinc-700'
							/>
							<span className='bg-white rounded-full h-2 w-40 border border-[rgb(250 250 250 / 0.1)] relative'>
								<span
									className={`bg-cyan-400 rounded-full h-2 w-[70%] absolute  -bottom-[1px] -left-[1px]`}></span>
							</span>
							<IconPlus
								size={14}
								stroke={2}
								strokeLinejoin='miter'
								className='cursor-pointer dark:text-zinc-50 text-zinc-700'
							/>
						</span>
					</div> */}
					<div className='space-y-4'>
						<VolumeBar
							volume={volume}
							setVolume={(value: React.SetStateAction<number>) =>
								setVolume(value)
							}
						/>
					</div>
				</div>
				{/* <div className='w-[1px] h-7 mt-auto bg-gray-300 dark:bg-zinc-700' /> */}
				<div className='w-[1px] h-7 mt-auto bg-gray-300 dark:bg-zinc-700' />
				{/* <div className='2xl:w-[20%] w-[25%] flex flex-col gap-4 items-center '>
					<span className='uppercase leading-3 dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
						Takes
					</span>
					<div className='flex items-center gap-[10px]'>
						<Button
							className='dark:bg-green-500 rounded-full min-w-7 max-w-7 h-7 bg-green-400 hover:bg-green-500 dark:hover:bg-green-400 text-zinc-800 dark:text-zinc-50  dark:border-green-700'
							label='A'
						/>
						<Button
							className='dark:bg-white border-cyan-400 rounded-full min-w-7 max-w-7 h-7 bg-white hover:bg-green-500  text-zinc-800 dark:text-black  dark:border-cyan-400'
							label='B'
						/>
						<Button
							className='dark:bg-white border-cyan-400 rounded-full min-w-7 max-w-7 h-7 bg-white hover:bg-green-500  text-zinc-800 dark:text-black  dark:border-cyan-400'
							label='C'
						/>
					</div>
				</div>
				<div className='w-[1px] h-7 mt-auto bg-gray-300 dark:bg-zinc-700' /> */}

				<div className='2xl:w-[10%] w-[15%] flex flex-col gap-4 items-center  '>
					<p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium '>
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
			{/* <div className='p-5 flex items-center justify-end'>
					<Badge className='h-4 max-h-4'>saved 5 mins ago</Badge>
				</div> */}
			{/* </div> */}
		</div>
	);
};
