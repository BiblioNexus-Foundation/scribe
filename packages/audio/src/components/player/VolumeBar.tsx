// import { useCallback, useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { IconMinus, IconPlus } from '@tabler/icons-react';
interface VolumeBarProps {
	volume: number;
	setVolume: any;
}

export const VolumeBar: React.FC<VolumeBarProps> = ({ volume, setVolume }) => {
	// const [volume, setVolume] = useState(10);

	// const volumnChange = useCallback((value: number) => {
	// 	if (soundRef.current && wavesurferRef.current) {
	// 		soundRef.current.volume(value);
	// 		setVolume(value);
	// 		console.log('Volumn set', value);

	// 		// wavesurferRef.current.stop();
	// 	}
	// }, []);
	console.log('volume', volume);

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
					onClick={() => volume > 0 && setVolume(volume - 1)}
				/>
				<span className='bg-white rounded-full h-2 w-40 border border-[rgb(250 250 250 / 0.1)] relative'>
					<span
						// className={`bg-cyan-400 rounded-full h-2 absolute -bottom-[1px] -left-[1px] w-[${width}%]`}
						style={{ width: `${volume * 10}%` }}
						className={`bg-cyan-400 rounded-full h-2 absolute  -bottom-[1px] -left-[1px]`}></span>
				</span>
				{/* <input
								type='range'
								min={0}
								max={1}
								step={0.1}
								// value={volume}
								// onChange={(event) => {
								// 	volumnChange(event.target.valueAsNumber);
								// }}
							/> */}
				<IconPlus
					size={14}
					stroke={2}
					strokeLinejoin='miter'
					className='cursor-pointer dark:text-zinc-50 text-zinc-700'
					onClick={() => volume < 10 && setVolume(volume + 1)}
				/>
			</span>
		</>
	);
};

export default VolumeBar;
