import { useCallback, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import * as React from 'react';
import { Howl } from 'howler';
// const { Howl } = require('howler.js');
interface IWaveformProps {
	url: string;
	control: string;
	theme: string;
	setControl: any;
	volume: number;
}

function Waveform({ url, control, theme, setControl, volume }: IWaveformProps) {
	console.log('current url', url, control, theme);

	const containerRef = useRef<HTMLDivElement | null>(null);
	const wavesurferRef = useRef<WaveSurfer | null>(null);
	// const [audioPlayBack, setAudioPlayBack] = useState(0);
	const soundRef = useRef<Howl | null>(null);

	// Fetch and load the audio and waveform
	function fetchAudioFile(audioPath: string) {
		console.log('Loading---', audioPath);

		if (audioPath) {
			fetch(audioPath)
				.then((response) => response.arrayBuffer())
				.then((arrayBuffer) => {
					const blob = new Blob([arrayBuffer]);
					const url = URL.createObjectURL(blob);
					console.log('volume initail', volume);

					wavesurferRef.current = WaveSurfer.create({
						container: '#wav-container',
						waveColor: '#22D3EE',
						progressColor: theme === 'dark' ? '#FFFFFF' : '#000000',
						cursorColor: '#22D3EE',
						height: 'auto',
						hideScrollbar: true,
						interact: true,
						barWidth: 2,
						barGap: 2,
						barRadius: 2,
						backend: 'MediaElement', // Use the same backend for syncing with Howler
					});

					wavesurferRef.current.load(url);
					soundRef.current = new Howl({
						src: [url],
						volume: volume,
						onend: function () {
							console.log('Finished!');
						},
					});

					// wavesurferRef.current.on('ready', () => {
					// 	const duration = wavesurferRef.current?.getDuration();
					// 	if (duration) {
					// 		setAudioPlayBack(duration);
					// 	}
					// });

					// wavesurferRef.current.on('audioprocess', (time: any) => {
					// 	setAudioPlayBack(time);
					// });

					// wavesurferRef.current.on('seek', (time) => {
					// 	setAudioPlayBack(time);
					// });
				});
		}
	}

	const onPlay = useCallback(() => {
		console.log('Yooooo');

		console.log(soundRef.current, '&&', wavesurferRef.current);

		if (soundRef.current && wavesurferRef.current) {
			console.log('play volumn', volume);
			soundRef.current.play();
			wavesurferRef.current.play();
		}
	}, []);

	const onPause = useCallback(() => {
		if (soundRef.current && wavesurferRef.current) {
			soundRef.current.pause();
			wavesurferRef.current.pause();
		}
	}, []);

	const onRewind = useCallback(() => {
		if (soundRef.current && wavesurferRef.current) {
			soundRef.current.seek(0);
			wavesurferRef.current.seekTo(0);
			setControl('play');
		}
	}, []);

	const onStop = useCallback(() => {
		if (soundRef.current && wavesurferRef.current) {
			soundRef.current.stop();
			wavesurferRef.current.stop();
		}
	}, []);

	// const volumnChange = useCallback((value: number) => {
	// 	if (soundRef.current && wavesurferRef.current) {
	// 		soundRef.current.volume(value);
	// 		console.log('Volumn set', value);

	// 		// wavesurferRef.current.stop();
	// 	}
	// }, []);

	useEffect(() => {
		if (soundRef.current) {
			console.log('volume update', volume, soundRef.current, Howler);
			// soundRef.current.volume(volume);
			Howler.volume(volume);
		}
	}, [volume]);

	useEffect(() => {
		console.log('USEEFFECT ---------');

		fetchAudioFile(url);
		return () => {
			if (wavesurferRef.current) {
				wavesurferRef.current.destroy();
			}
		};
	}, [url]);

	useEffect(() => {
		switch (control) {
			case 'play': {
				console.log('calling play');

				onPlay();
				break;
			}
			case 'pause': {
				onPause();
				break;
			}
			case 'rewind': {
				onRewind();
				break;
			}
			case 'stop': {
				onStop();
				break;
			}
			default:
				break;
		}
	}, [control]);

	// function formatAudioDuration(durationInSeconds: number) {
	// 	const minutes = Math.floor(durationInSeconds / 60);
	// 	const seconds = Math.floor(durationInSeconds % 60);
	// 	return `${minutes < 10 ? '0' : ''}${minutes}:${
	// 		seconds < 10 ? '0' : ''
	// 	}${seconds}`;
	// }

	return (
		<div className='flex items-center justify-between w-full gap-3'>
			<div
				className='flex-1 relative h-16'
				ref={containerRef}
				id='wav-container'
			/>
			{/* {url && (
				<div className=''>{formatAudioDuration(audioPlayBack)}</div>
			)}
		 */}
		</div>
	);
}

export default Waveform;
