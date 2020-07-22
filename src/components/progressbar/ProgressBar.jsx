import React, { useRef, useEffect } from 'react';
import './ProgressBar.scss';

const ProgressBar = ({ min = 0, max = 0, value = 0 }) => {
	const progress = useRef();

	useEffect(() => {
		if (progress.current)
			progress.current.style.width = `${(100 / (max - min)) * (value - min)}%`;
		console.log('min', min, 'max', max, 'value', value);
	}, [min, max, value]);

	return (
		<div className="progress-bar">
			<div ref={progress} className="progress" />
		</div>
	);
};

export default ProgressBar;
