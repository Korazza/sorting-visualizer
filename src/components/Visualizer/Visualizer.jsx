import React, { useState, useEffect, useRef } from 'react';
import ProgressBar from '../ProgressBar';
import Bar from '../Bar';
import {
	FaPlay,
	FaPause,
	FaRedo,
	FaStepBackward,
	FaStepForward,
} from 'react-icons/fa';
import './Visualizer.scss';

const Visualizer = (props) => {
	const {
		array,
		size,
		animationSpeed,
		algorithm,
		playingProp,
		sortingProp,
	} = props;

	const [playing, setPlaying] = playingProp;
	const [sorting, setSorting] = sortingProp;

	const [yellow, setYellow] = useState([]);
	const [red, setRed] = useState([]);
	const [purple, setPurple] = useState([]);
	const [heights, setHeights] = useState([]);
	const [sorted, setSorted] = useState([]);
	const [frames, setFrames] = useState([]);
	const [step, setStep] = useState(0);
	const timeoutIds = useRef([]);
	const backward = useRef(false);

	const resetFrames = () => {
		setStep(0);
		setYellow([]);
		setRed([]);
		setHeights([]);
		setSorted([]);
	};

	const update = (
		{
			yellowFrame = [],
			redFrame = [],
			purpleFrame = [],
			heightFrame = [],
			sortedFrame = [],
		},
		step
	) => {
		setYellow(yellowFrame);
		setRed(redFrame);
		setPurple(purpleFrame);
		setHeights(heightFrame);
		setSorted(sortedFrame);
		setStep((prevStep) => prevStep + step);
	};

	const clearTimeouts = () => {
		timeoutIds.current.forEach((timeout) => clearTimeout(timeout));
		timeoutIds.current = [];
	};

	const play = (frames) => {
		backward.current = false;
		frames.forEach((animation, index) => {
			timeoutIds.current.push(
				setTimeout(update, index * animationSpeed, animation, +1)
			);
		});
		timeoutIds.current.push(
			setTimeout(handlePause, (timeoutIds.current.length - 1) * animationSpeed)
		);
	};

	const handlePlay = () => {
		backward.current = false;
		if (sorted.length < size) {
			setPlaying(true);
			if (step === 0) play(frames.slice(1));
			else play(frames.slice(step + 1));
		}
	};

	const handlePause = () => {
		clearTimeouts();
		setPlaying(false);
	};

	const handleReplay = () => {
		clearTimeouts();
		resetFrames();
		play(frames.slice(1));
		setPlaying(true);
	};

	const handleStepBackward = () => {
		if (step > 0) {
			let animation = frames[step - 1];
			backward.current = true;
			update(animation, -1);
		}
	};

	const handleStepForward = () => {
		console.log(frames[step + 1]);
		if (step < frames.length - 1) {
			let animation = frames[step + 1];
			backward.current = false;
			update(animation, +1);
		}
	};

	useEffect(() => {
		setYellow([]);
		setRed([]);
		setSorted([]);
		setPlaying(false);
		setStep(0);
		clearTimeouts();
	}, [array, size, setPlaying]);

	useEffect(() => {
		resetFrames();
	}, [algorithm]);

	useEffect(() => {
		if (algorithm) setFrames(algorithm.run(array));
	}, [algorithm, array]);

	useEffect(() => {
		if (step !== 0 && step === frames.length - 1) setSorting(false);
		else setSorting(true);
	}, [step, frames, setSorting]);

	return (
		<>
			<div className="bar-group">
				{array.map((value, index) => {
					let width = window.innerWidth / (size * 40);
					let height =
						step !== 0
							? heights.includes(index) &&
							  heights[heights.findIndex((el) => el === index) + 1][
									backward.current ? 'oldHeight' : 'newHeight'
							  ]
							: value;
					let yellowState = yellow.includes(index);
					let redState = red.includes(index);
					let purpleState = purple.includes(index);
					let sortedState = sorted.includes(index);
					return (
						<Bar
							key={index}
							width={width}
							height={height}
							yellow={yellowState}
							red={redState}
							purple={purpleState}
							sorted={sortedState}
						/>
					);
				})}
			</div>
			<div className="container">
				<ProgressBar min={0} max={frames.length - 1} value={step} />
				<button className="btn" onClick={!playing ? handleStepBackward : null}>
					<FaStepBackward size={'1.15em'} />
				</button>
				<button
					className="btn"
					onClick={() =>
						playing ? handlePause() : sorting ? handlePlay() : handleReplay()
					}
				>
					{playing ? (
						<FaPause size={'1.15em'} />
					) : sorting ? (
						<FaPlay size={'1.15em'} />
					) : (
						<FaRedo size={'1.15em'} />
					)}
				</button>
				<button className="btn" onClick={!playing ? handleStepForward : null}>
					<FaStepForward size={'1.15em'} />
				</button>
			</div>
		</>
	);
};

export default Visualizer;
