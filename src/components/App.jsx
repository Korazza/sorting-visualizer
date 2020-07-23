import React, { useState } from 'react';
import Visualizer from './Visualizer';
import './App.scss';

const App = () => {
	const [size, setSize] = useState(5);
	return (
		<>
			<input
				className="slider"
				type="range"
				min={5}
				max={100}
				value={size}
				onChange={(e) => setSize(e.target.value)}
			/>
			<Visualizer size={size} animationSpeed={100 / (size * 0.02)} />
		</>
	);
};

export default App;
