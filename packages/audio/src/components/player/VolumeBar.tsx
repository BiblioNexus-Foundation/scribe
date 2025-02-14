import * as React from 'react';
import { IconMinus, IconPlus } from '@tabler/icons-react';
interface VolumeBarProps {
	volume: number;
	setVolume: any;
}

export const VolumeBar: React.FC<VolumeBarProps> = ({ volume, setVolume }) => {
	return (
		<>
			<p className='uppercase dark:text-zinc-500 text-zinc-400 text-[10px] text-center  font-medium '>
				Volume
			</p>
			<span className='flex items-center gap-x-2'>
				<IconMinus
					size={14}
					stroke={2}
					strokeLinejoin='miter'
					className='cursor-pointer dark:text-zinc-50 text-zinc-700'
					onClick={() => volume > 0 && setVolume(volume - 0.1)}
				/>
				<input
					type='range'
					min={0}
					max={1}
					step={0.1}
					value={volume}
					onChange={(event) => {
						setVolume(event.target.valueAsNumber);
					}}
					style={{ accentColor: '#26C6DA' }}
				/>
				<IconPlus
					size={14}
					stroke={2}
					strokeLinejoin='miter'
					className='cursor-pointer dark:text-zinc-50 text-zinc-700'
					onClick={() => volume < 1 && setVolume(volume + 0.1)}
				/>
			</span>
		</>
	);
};

export default VolumeBar;
