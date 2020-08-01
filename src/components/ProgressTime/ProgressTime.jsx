import React, { useState, useRef, useEffect } from 'react';
import './ProgressTime.scss';

const ProgressTime = ({ playing, step, duration }) => {
	const timerId = useRef(null);
	const [current, setCurrent] = useState(step);
	const [currentInMin, setCurrentInMin] = useState('');
	const [durationInMin, setDurationInMin] = useState('');

	const seconds2Minutes = (timeInSeconds) => {
		let pad = function (num, size) {
				return ('000' + num).slice(size * -1);
			},
			time = parseFloat(timeInSeconds).toFixed(3),
			minutes = Math.floor(time / 60) % 60,
			seconds = Math.floor(time - minutes * 60);

		return pad(minutes, 2) + ':' + pad(seconds, 2);
	};

	useEffect(() => {
		if (playing) {
			timerId.current = setInterval(() => {
				setCurrent((prevCurrent) => prevCurrent + 1);
			}, 1000);
		} else {
			clearInterval(timerId.current);
		}
	}, [playing]);

	useEffect(() => {
		if (!playing) setCurrent(step);
	}, [playing, step]);

	console.log(current);

	useEffect(() => {
		setCurrentInMin(seconds2Minutes(current));
	}, [current]);

	useEffect(() => {
		setDurationInMin(seconds2Minutes(duration));
	}, [duration]);

	return (
		<div className="progress-time">
			{currentInMin} / {durationInMin}
		</div>
	);
};

export default ProgressTime;
