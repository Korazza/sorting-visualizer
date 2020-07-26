import React, { useState, useEffect } from 'react';
import Visualizer from '../Visualizer';
import { BubbleSort, MergeSort, QuickSort } from '../../algorithms';
import './App.scss';

const App = () => {
	const [size, setSize] = useState(5);
	const [algorithm, setAlgorithm] = useState();
	const [playing, setPlaying] = useState(false);
	const [sorting, setSorting] = useState(true);

	const handleAlgorithmChange = (newAlgorithm) => {
		if (newAlgorithm.name !== algorithm.name && !playing) {
			setAlgorithm(newAlgorithm);
		}
	};

	useEffect(() => {
		setAlgorithm(new BubbleSort());
	}, []);

	return (
		<>
			<header>
				<input
					className="slider"
					type="range"
					min={5}
					max={50}
					value={size}
					onChange={(e) => setSize(e.target.value)}
				/>
				<button className="btn">
					{algorithm ? algorithm.name : 'Select an algorithm'}
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
				size={size}
				animationSpeed={100 / (size * 0.02)}
				algorithm={algorithm}
				playing={playing}
				sorting={sorting}
				setPlaying={setPlaying}
				setSorting={setSorting}
			/>
		</>
	);
};

export default App;
