import React, { useState, useRef, useEffect } from 'react';
import './Bar.scss';

const Bar = ({ width, height, comparing, swapping, sorted }) => {
	const [wrapperClassName, setWrapperClassName] = useState('');
	const [barClassName, setBarClassName] = useState('');
	const [wrapperStyle, setWrapperStyle] = useState();
	const [barStyle, setBarStyle] = useState();
	const [content, setContent] = useState('');
	const div = useRef();

	useEffect(() => {
		let widthStyle = `${width}px`;
		if (height) {
			let heightStyle = `${height}%`;
			setWrapperStyle({ width: widthStyle });
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
		if ((comparing || swapping) && width >= 30) wrapperClasses += ' mx';
		if (comparing) barClasses += ' comparing';
		if (swapping) barClasses += ' swapping';
		if (sorted) {
			wrapperClasses += ' sorted';
			barClasses += ' sorted';
		}
		setWrapperClassName(wrapperClasses);
		setBarClassName(barClasses);
	}, [width, comparing, swapping, sorted]);

	return (
		<div style={wrapperStyle} className={'wrapper' + wrapperClassName}>
			<div ref={div} style={barStyle} className={'bar' + barClassName}>
				{width >= 30 && content}
			</div>
		</div>
	);
};

export default Bar;
