import React, { useState, useEffect } from 'react';
import './ProgressBar.scss';

const ProgressBar = ({ min = 0, max = 100, value = 1 }) => {
	const map = (s, a1, a2, b1, b2) => {
		let mapped = b1 + ((s - a1) * (b2 - b1)) / (a2 - a1);
		return mapped <= b2 ? (mapped >= b1 ? mapped : b1) : b2;
	};

	const [width, setWidth] = useState('');

	useEffect(() => {
		let percentage = map(value, min, max, 0, 100);
		setWidth(`${percentage}%`);
	}, [min, max, value]);

	return (
		<div className="progress-bar">
			<div style={{ width }} className="progress-line" />
		</div>
	);
};

export default ProgressBar;
