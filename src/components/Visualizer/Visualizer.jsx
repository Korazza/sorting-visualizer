import React, { useState, useEffect, useRef } from 'react';
import Bar from '../Bar';
import ProgressTime from '../ProgressTime';
import ProgressBar from '../ProgressBar';
import {
	FaPlay,
	FaPause,
	FaRedo,
	FaStepBackward,
	FaStepForward,
	FaFastBackward,
	FaFastForward,
} from 'react-icons/fa';
import './Visualizer.scss';
import { useCallback } from 'react';

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

	const [arrayFrame, setArrayFrame] = useState([]);
	const [yellowFrame, setYellowFrame] = useState([]);
	const [redFrame, setRedFrame] = useState([]);
	const [purpleFrame, setPurpleFrame] = useState([]);
	const [sortedFrame, setSortedFrame] = useState([]);
	const [frames, setFrames] = useState([]);
	const [step, setStep] = useState(0);
	const timeoutIds = useRef([]);
	const backward = useRef(false);

	const resetFrames = useCallback(() => {
		setStep(0);
		setArrayFrame([...array]);
		setYellowFrame([]);
		setRedFrame([]);
		setPurpleFrame([]);
		setSortedFrame([]);
	}, [array]);

	const update = (
		{
			arrayFrame = [],
			yellowFrame = [],
			redFrame = [],
			purpleFrame = [],
			sortedFrame = [],
		},
		step
	) => {
		setArrayFrame(arrayFrame);
		setYellowFrame(yellowFrame);
		setRedFrame(redFrame);
		setPurpleFrame(purpleFrame);
		setSortedFrame(sortedFrame);
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
		if (sortedFrame.length < size) {
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
		if (step < frames.length - 1) {
			let animation = frames[step + 1];
			backward.current = false;
			update(animation, +1);
		}
	};

	const handleBackward = () => {
		let animation = frames[0];
		update(animation, -step);
	};

	const handleForward = () => {
		let animation = frames[frames.length - 1];
		update(animation, frames.length - 1 - step);
	};

	useEffect(() => {
		setArrayFrame([]);
		setYellowFrame([]);
		setRedFrame([]);
		setPurpleFrame([]);
		setSortedFrame([]);
		setPlaying(false);
		setStep(0);
		clearTimeouts();
	}, [array, size, setPlaying]);

	useEffect(() => {
		resetFrames();
	}, [algorithm, resetFrames]);

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
				{(arrayFrame.length > 0 ? arrayFrame : array).map((height, index) => {
					let width = window.innerWidth / (size * 40);
					let yellowState = yellowFrame.includes(index);
					let redState = redFrame.includes(index);
					let purpleState = purpleFrame.includes(index);
					let sortedState = sortedFrame.includes(index);
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
				<div className="progress">
					<ProgressTime
						playing={playing}
						step={(animationSpeed / 1000) * step}
						duration={(animationSpeed / 1000) * (frames.length - 1)}
					/>
					<ProgressBar min={0} max={frames.length - 1} value={step} />
				</div>
				<button className="btn" onClick={!playing ? handleBackward : null}>
					<FaFastBackward size={'1.15em'} />
				</button>
				<button className="btn" onClick={!playing ? handleStepBackward : null}>
					<FaStepBackward size={'1.15em'} />
				</button>
				<button
					className="btn"
					onClick={playing ? handlePause : sorting ? handlePlay : handleReplay}
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
				<button className="btn" onClick={!playing ? handleForward : null}>
					<FaFastForward size={'1.15em'} />
				</button>
			</div>
		</>
	);
};

export default Visualizer;
