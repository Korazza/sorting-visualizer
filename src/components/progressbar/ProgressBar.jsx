import React, { useState, useEffect } from 'react';
import './ProgressBar.scss';

const ProgressBar = ({ min = 0, max = 100, value = 1 }) => {
	const [width, setWidth] = useState();

	useEffect(() => {
		let percentage = (100 / (max - min)) * (value - min);
		percentage
			? setWidth(`${(100 / (max - min)) * (value - min)}%`)
			: setWidth('0%');
	}, [min, max, value]);

	return (
		<div className="progress-bar">
			<div style={{ width }} className="progress" />
		</div>
	);
};

export default ProgressBar;
