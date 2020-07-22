import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
	FaPlay,
	FaPause,
	FaRedo,
	FaStepBackward,
	FaStepForward,
	FaUndo,
} from 'react-icons/fa';
import ProgressBar from '../progressbar/ProgressBar';
import Bar from '../bar/Bar';
import './Visualizer.scss';

const Visualizer = (props) => {
	const { size, animationSpeed } = props;

	const [array, setArray] = useState([]);
	const sortedArray = useRef([]);
	const [algorithm, setAlgorithm] = useState();
	const [comparing, setComparing] = useState([]);
	const [swapping, setSwapping] = useState([]);
	const [heights, setHeights] = useState([]);
	const [sorted, setSorted] = useState([]);
	const [playing, setPlaying] = useState(false);
	const timeoutIds = useRef([]);
	const trace = useRef([]);
	const [step, setStep] = useState(0);
	const backward = useRef(false);

	const resetArray = useCallback(() => {
		let tmp = [];
		for (let i = 0; i < size; i++) {
			tmp.push(Math.floor(Math.random() * 0.68 * window.innerHeight) + 25);
		}
		setArray(tmp);
		sortedArray.current = [];
		setComparing([]);
		setSwapping([]);
		setSorted([]);
		setPlaying(false);
		setStep(0);
		trace.current = resetTrace();
		clearTimeouts();
	}, [size]);

	useEffect(() => {
		resetArray();
	}, [resetArray]);

	const resetTrace = () => {
		return [
			{
				comparingFrame: [],
				swappingFrame: [],
				heightFrame: [],
				sortedFrame: [],
			},
		];
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

	const play = (trace) => {
		backward.current = false;
		trace.forEach((animation, index) => {
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
			if (step === 0) play(trace.current.slice(1));
			else play(trace.current.slice(step + 1));
		}
	};

	const handlePause = () => {
		clearTimeouts();
		setPlaying(false);
	};

	const handleStepBackward = () => {
		if (step > 0) {
			let animation = trace.current[step - 1];
			backward.current = true;
			update(animation, -1);
		}
	};

	const handleStepForward = () => {
		if (step < trace.current.length - 1) {
			let animation = trace.current[step + 1];
			backward.current = false;
			update(animation, +1);
		}
	};

	const lastSortedFrame = () => {
		return trace.current[trace.current.length - 1].sortedFrame;
	};

	const bubbleSort = useCallback(() => {
		sortedArray.current = array.slice();
		trace.current = resetTrace();
		for (let i = 0; i < sortedArray.current.length; i++) {
			for (let j = 0; j < sortedArray.current.length - 1 - i; j++) {
				trace.current.push({
					comparingFrame: [j, j + 1],
					swappingFrame: [],
					heightFrame: [],
					sortedFrame: lastSortedFrame(),
				});
				if (sortedArray.current[j] > sortedArray.current[j + 1]) {
					let value1 = sortedArray.current[j + 1];
					let value2 = sortedArray.current[j];
					trace.current.push({
						comparingFrame: [],
						swappingFrame: [j, j + 1],
						heightFrame: [
							j,
							{ newHeight: value1, oldHeight: value2 },
							j + 1,
							{ newHeight: value2, oldHeight: value1 },
						],
						sortedFrame: lastSortedFrame(),
					});
					let tmp = sortedArray.current[j];
					sortedArray.current[j] = sortedArray.current[j + 1];
					sortedArray.current[j + 1] = tmp;
				}
			}
			trace.current.push({
				comparingFrame: [],
				swappingFrame: [],
				heightFrame: [],
				sortedFrame: [...lastSortedFrame(), sortedArray.current.length - 1 - i],
			});
		}
	}, [array]);

	const mergeSort = () => {};

	const quickSort = () => {};

	const handleAlgorithmChange = (algorithm) => {
		algorithm();
	};

	useEffect(() => {
		setAlgorithm({
			name: 'BubbleSort',
			run: bubbleSort,
		});
	}, [bubbleSort]);

	useEffect(() => {
		if (algorithm) algorithm.run();
	}, [algorithm]);

	return (
		<>
			<h3>Sorting Algorithms</h3>
			<button style={{ float: 'right' }} className="glow">
				{algorithm ? algorithm.name : 'Select an algorithm'}
			</button>
			<button style={{ float: 'right' }} className="glow">
				{sorted.length === size ? 'Sorted' : 'Unsorted'}
			</button>
			<div className="ui-group">
				<ProgressBar min={0} max={trace.current.length - 1} value={step} />
				<div>
					<button className="glow orange" onClick={() => resetArray()}>
						<FaUndo />
					</button>
					<button
						className="glow purple"
						onClick={() => handleAlgorithmChange(bubbleSort)}
					>
						BubbleSort
					</button>
					<button
						className="glow purple"
						onClick={() => handleAlgorithmChange(mergeSort)}
					>
						MergeSort
					</button>
					<button
						className="glow purple"
						onClick={() => handleAlgorithmChange(quickSort)}
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
						onClick={() => (playing ? handlePause() : handlePlay())}
					>
						{playing ? (
							<FaPause />
						) : sorted.length === size ? (
							<FaRedo />
						) : (
							<FaPlay />
						)}
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
