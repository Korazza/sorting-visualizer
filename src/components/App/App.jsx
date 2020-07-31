import React, { useState, useEffect, useCallback } from 'react';
import Visualizer from '../Visualizer';
import { BubbleSort, MergeSort, QuickSort } from '../../algorithms';
import { FaUndo } from 'react-icons/fa';
import './App.scss';

const App = () => {
	const [array, setArray] = useState([]);
	const [size, setSize] = useState(10);
	const [algorithm, setAlgorithm] = useState();
	const [playing, setPlaying] = useState(false);
	const [sorting, setSorting] = useState(true);

	const handleAlgorithmChange = (newAlgorithm) => {
		if (newAlgorithm.name !== algorithm.name && !playing) {
			setAlgorithm(newAlgorithm);
		}
	};

	const reset = useCallback(() => {
		let tmp = [];
		for (let i = 0; i < size; i++) {
			tmp.push(getRandom(5, 100));
		}
		setArray(tmp);
	}, [size]);

	useEffect(() => {
		reset();
	}, [reset]);

	useEffect(() => {
		setAlgorithm(new BubbleSort());
	}, []);

	const getRandom = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	return (
		<>
			<header>
				{window.innerWidth > 468 && (
					<input
						className="slider"
						type="range"
						min={5}
						max={200}
						value={size}
						onChange={(e) => setSize(e.target.value)}
					/>
				)}
				<button className="btn" onClick={reset}>
					Reset
					<FaUndo size={'1.15em'} style={{ marginLeft: '0.8em' }} />
				</button>
				<button className="btn">{sorting ? 'Unsorted' : 'Sorted'}</button>
				<button
					className="btn"
					onClick={() => handleAlgorithmChange(new BubbleSort())}
				>
					BubbleSort
				</button>
				<button
					className="btn"
					onClick={() => handleAlgorithmChange(new MergeSort())}
				>
					MergeSort
				</button>
				<button
					className="btn"
					onClick={() => handleAlgorithmChange(new QuickSort())}
				>
					QuickSort
				</button>
			</header>
			<Visualizer
				array={array}
				size={size}
				animationSpeed={100 / (size * 0.02)}
				algorithm={algorithm}
				playingProp={[playing, setPlaying]}
				sortingProp={[sorting, setSorting]}
			/>
		</>
	);
};

export default App;
