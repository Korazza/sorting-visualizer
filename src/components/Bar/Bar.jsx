import React, { useState, useRef, useEffect } from 'react';
import './Bar.scss';

const Bar = ({ width, height, yellow, red, purple, sorted }) => {
	const [barClassName, setBarClassName] = useState('');
	const [wrapperClassName, setWrapperClassName] = useState('');
	const [wrapperStyle, setWrapperStyle] = useState();
	const [barStyle, setBarStyle] = useState();
	const [content, setContent] = useState('');
	const div = useRef();

	useEffect(() => {
		let marginStyle = `0 ${width * 1.5}px`;
		let widthStyle = `${width}%`;
		if (height) {
			let heightStyle = `${height}%`;
			setWrapperStyle({ margin: marginStyle, width: widthStyle });
			setBarStyle({
				height: heightStyle,
			});
		}
	}, [width, height]);

	useEffect(() => {
		if (height) setContent(`${height}`);
	}, [content, height]);

	useEffect(() => {
		let wrapperClasses = '';
		let barClasses = '';
		if (yellow) barClasses += ' yellow';
		else if (red) barClasses += ' red';
		else if (purple) barClasses += ' purple';
		else if (sorted) {
			wrapperClasses += ' sorted';
			barClasses += ' sorted';
		}
		setWrapperClassName(wrapperClasses);
		setBarClassName(barClasses);
	}, [width, yellow, red, purple, sorted]);

	return (
		<div style={wrapperStyle} className={'bar-wrapper' + wrapperClassName}>
			<div ref={div} style={barStyle} className={'bar' + barClassName}>
				{width >= 1.3 && content}
			</div>
		</div>
	);
};

export default Bar;
