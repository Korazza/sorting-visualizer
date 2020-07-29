import React, { useState, useRef, useEffect } from 'react';
import './Bar.scss';

const Bar = ({ width, height, comparing, swapping, sorted }) => {
	const [barClassName, setBarClassName] = useState('');
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
		let barClasses = '';
		if (comparing) barClasses += ' comparing';
		if (swapping) barClasses += ' swapping';
		if (sorted) barClasses += ' sorted';

		setBarClassName(barClasses);
	}, [width, comparing, swapping, sorted]);

	return (
		<div style={wrapperStyle} className={'bar-wrapper'}>
			<div ref={div} style={barStyle} className={'bar' + barClassName}>
				{width >= 1.3 && content}
			</div>
		</div>
	);
};

export default Bar;
