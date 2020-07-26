import React, { useState, useEffect, useCallback, useRef } from 'react';
import ProgressBar from '../ProgressBar';
import Bar from '../Bar';
import {
	FaPlay,
	FaPause,
	FaRedo,
	FaStepBackward,
	FaStepForward,
	FaUndo,
} from 'react-icons/fa';
import './Visualizer.scss';

const Visualizer = (props) => {
	const {
		size,
		animationSpeed,
		algorithm,
		playing,
		sorting,
		setPlaying,
		setSorting,
	} = props;

	const [array, setArray] = useState([]);
	const [comparing, setComparing] = useState([]);
	const [swapping, setSwapping] = useState([]);
	const [heights, setHeights] = useState([]);
	const [sorted, setSorted] = useState([]);
	const [frames, setFrames] = useState([]);
	const [step, setStep] = useState(0);
	const timeoutIds = useRef([]);
	const backward = useRef(false);

	const resetArray = useCallback(() => {
		let tmp = [];
		for (let i = 0; i < size; i++) {
			tmp.push(Math.floor(Math.random() * 100) + 15);
		}
		setArray(tmp);
		setComparing([]);
		setSwapping([]);
		setSorted([]);
		setPlaying(false);
		setStep(0);
		clearTimeouts();
	}, [size, setPlaying]);

	const resetFrames = () => {
		setStep(0);
		setComparing([]);
		setSwapping([]);
		setHeights([]);
		setSorted([]);
	};

	const update = (
		{ comparingFrame, swappingFrame, heightFrame, sortedFrame },
		step
	) => {
		setComparing(comparingFrame);
		setSwapping(swappingFrame);
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
		setPlaying(true);
		play(frames.slice(1));
	};

	const handleStepBackward = () => {
		if (step > 0) {
			let animation = frames[step - 1];
			backward.current = true;
			update(animation, -1);
		}
	};

	const handleStepForward = () => {
		if (step < frames.length - 1) {
			let animation = frames[step + 1];
			backward.current = false;
			update(animation, +1);
		}
	};

	useEffect(() => {
		resetArray();
	}, [resetArray]);

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
		<div className="visualizer">
			<div className="bar-group">
				{array.map((value, index) => {
					let width = window.innerWidth / (2 * size);
					let height =
						step !== 0
							? heights.includes(index) &&
							  heights[heights.findIndex((el) => el === index) + 1][
									backward.current ? 'oldHeight' : 'newHeight'
							  ]
							: value;
					let comparingState = comparing.includes(index);
					let swappingState = swapping.includes(index);
					let sortedState = sorted.includes(index);
					return (
						<Bar
							key={index}
							width={width}
							height={height}
							comparing={comparingState}
							swapping={swappingState}
							sorted={sortedState}
						/>
					);
				})}
			</div>
			<div className="container">
				<ProgressBar min={0} max={frames.length - 1} value={step} />
				<button className="btn" onClick={() => resetArray()}>
					<FaUndo />
				</button>
				<button className="btn" onClick={!playing ? handleStepBackward : null}>
					<FaStepBackward />
				</button>
				<button
					className="btn"
					onClick={() =>
						playing ? handlePause() : sorting ? handlePlay() : handleReplay()
					}
				>
					{playing ? <FaPause /> : sorting ? <FaPlay /> : <FaRedo />}
				</button>
				<button className="btn" onClick={!playing ? handleStepForward : null}>
					<FaStepForward />
				</button>
			</div>
		</div>
	);
};

export default Visualizer;
