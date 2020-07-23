import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BubbleSort, MergeSort, QuickSort } from '../../algorithms';
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
	const { size, animationSpeed } = props;

	const [array, setArray] = useState([]);
	const [algorithm, setAlgorithm] = useState();
	const [comparing, setComparing] = useState([]);
	const [swapping, setSwapping] = useState([]);
	const [heights, setHeights] = useState([]);
	const [sorted, setSorted] = useState([]);
	const [playing, setPlaying] = useState(false);
	const [sorting, setSorting] = useState(true);
	const timeoutIds = useRef([]);
	const frames = useRef([]);
	const [step, setStep] = useState(0);
	const backward = useRef(false);

	const resetArray = useCallback(() => {
		let tmp = [];
		for (let i = 0; i < size; i++) {
			tmp.push(Math.floor(Math.random() * 0.68 * window.innerHeight) + 25);
		}
		setArray(tmp);
		setComparing([]);
		setSwapping([]);
		setSorted([]);
		setPlaying(false);
		setStep(0);
		clearTimeouts();
	}, [size]);

	useEffect(() => {
		resetArray();
	}, [resetArray]);

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
			if (step === 0) play(frames.current.slice(1));
			else play(frames.current.slice(step + 1));
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
		play(frames.current.slice(1));
	};

	const handleStepBackward = () => {
		if (step > 0) {
			let animation = frames.current[step - 1];
			backward.current = true;
			update(animation, -1);
		}
	};

	const handleStepForward = () => {
		if (step < frames.current.length - 1) {
			let animation = frames.current[step + 1];
			backward.current = false;
			update(animation, +1);
		}
	};

	const handleAlgorithmChange = (newAlgorithm) => {
		if (newAlgorithm.name !== algorithm.name && !playing) {
			resetFrames();
			setAlgorithm(newAlgorithm);
		}
	};

	useEffect(() => {
		setAlgorithm(new BubbleSort());
	}, []);

	useEffect(() => {
		if (algorithm) frames.current = algorithm.run(array);
	}, [algorithm, array]);

	useEffect(() => {
		if (step !== 0 && step === frames.current.length - 1) setSorting(false);
		else setSorting(true);
	}, [step]);

	return (
		<>
			<h3>Sorting Algorithms</h3>
			<button style={{ float: 'right' }} className="glow">
				{algorithm ? algorithm.name : 'Select an algorithm'}
			</button>
			<button style={{ float: 'right' }} className="glow">
				{sorting ? 'Unsorted' : 'Sorted'}
			</button>
			<div className="ui-group">
				<ProgressBar min={0} max={frames.current.length - 1} value={step} />
				<div>
					<button className="glow orange" onClick={() => resetArray()}>
						<FaUndo />
					</button>
					<button
						className="glow purple"
						onClick={() => handleAlgorithmChange(new BubbleSort())}
					>
						BubbleSort
					</button>
					<button
						className="glow purple"
						onClick={() => handleAlgorithmChange(new MergeSort())}
					>
						MergeSort
					</button>
					<button
						className="glow purple"
						onClick={() => handleAlgorithmChange(new QuickSort())}
					>
						QuickSort
					</button>
					<button
						className="glow pink"
						onClick={!playing ? handleStepBackward : null}
					>
						<FaStepBackward />
					</button>
					<button
						className="glow pink"
						onClick={() =>
							playing ? handlePause() : sorting ? handlePlay() : handleReplay()
						}
					>
						{playing ? <FaPause /> : sorting ? <FaPlay /> : <FaRedo />}
					</button>
					<button
						className="glow pink"
						onClick={!playing ? handleStepForward : null}
					>
						<FaStepForward />
					</button>
				</div>
			</div>
			<div className="container">
				<div className="bar-group">
					{array.map((value, index) => {
						let width = (1300 - 2 * size) / size;
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
			</div>
		</>
	);
};

export default Visualizer;
