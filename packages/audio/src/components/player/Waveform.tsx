import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Howl } from 'howler';
interface IWaveformProps {
	url: string;
	control: string;
	theme: string;
	setControl: any;
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
	const [howl, setHowl] = useState<Howl | null>(null);
	const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);

	useEffect(() => {
		// Creating WaveSurfer instance
		const ws = WaveSurfer.create({
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

		// Creating Howler instance and binding it to WaveSurfer
		const sound = new Howl({
			src: [url],
			volume: volume,
			onplay: () => {
				ws.play();
			},
			onpause: () => {
				ws.pause();
			},
			onstop: () => {
				ws.stop();
			},
			onend: () => {
				ws.stop();
			},
		});

		// Load audio into WaveSurfer
		ws.load(url);
		setWaveSurfer(ws);
		setHowl(sound);

		// Component unmount
		return () => {
			sound.unload();
			ws.destroy();
		};
	}, []);

	useEffect(() => {
		if (howl) {
			switch (control) {
				case 'play': {
					howl.play();
					break;
				}
				case 'pause': {
					howl.pause();
					break;
				}
				case 'rewind': {
					howl.seek(0);
					waveSurfer?.seekTo(0);
					setControl('play');
					break;
				}
				case 'stop': {
					howl.stop();
					break;
				}
				default:
					break;
			}
		}
	}, [control]);

	useEffect(() => {
		if (howl && waveSurfer) {
			const newVolume = Math.min(volume, 1);
			howl.volume(newVolume);
			waveSurfer.setVolume(newVolume);
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
			/>
		</div>
	);
};

export default Waveform;
